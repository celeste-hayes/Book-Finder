import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = ({ req }: any) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  // Extract token from the auth header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }
  // If no token is provided, return request object as is
  if (!token) {
    return req;
  }
  // Try to verify token
  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    // If token is valid, attach the user data to the request object
    req.user = data;
  } catch (err) {
    // If token is invalid, log an error message
    console.log('Invalid token');
  }
  // Return request object
  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  // Create a payload with user info
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  // Sign token with payload and secret key
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
