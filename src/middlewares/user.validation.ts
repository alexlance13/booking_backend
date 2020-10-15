import validate from "../helpers/validation";
import { UserInputError } from 'apollo-server-express';

export async function userValidation(root, args, {req, res}, info, next) { 
  const {user} = args;
  const messagesObj = validate({ name: 'user', value : user });
  if(Object.keys(messagesObj).length) {
    throw new UserInputError('Validation Error:', messagesObj);
  }
  console.log('Success')
  const result = await next();
  return result; 
}