import { User } from '../models/index.js';
import { signToken } from '../services/auth.js';
import { AuthenticationError } from 'apollo-server-errors';

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    bookCount: number;
    savedBooks: Book[];
}

interface Book {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
    link: string;
}

interface SaveBookArgs {
    bookData: Book;
}

interface RemoveBookArgs {
    bookId: string;
}

interface Context {
    user?: User;
}

const resolvers = {
    Query: {
        me: async (_parent: unknown, _args: unknown, context: Context): Promise<User | null> => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            const user = await User.findOne({ _id: context.user._id }).populate('savedBooks');
            return user as User | null;
        }
    },
    Mutation: {
        login: async (_parent: unknown, { email, password }: { email: string, password: string }): Promise<{ token: string, user: User }> => {
            const user = await User.findOne({ $or: [{ username: email }, { email }] });
            if (!user) {
                throw new AuthenticationError(`Can't find this user`);
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user: user.toObject() as User };
        },

        addUser: async (_parent: unknown, { username, email, password }: { username: string, email: string, password: string }): Promise<{ token: string, user: User }> => {
            const user = await User.create({ username, email, password });
            const token = signToken(user.username, user.email, user._id);
            return { token, user: user.toObject() as User };
        },

        saveBook: async (_parent: unknown, { bookData }: SaveBookArgs, context: Context): Promise<User | null> => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
            );
        },

        removeBook: async (_parent: unknown, { bookId }: RemoveBookArgs, context: Context): Promise<User | null> => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
        }
    }
};

export default resolvers;