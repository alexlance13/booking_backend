import { UserInputError } from 'apollo-server-express';
import Validator from 'validatorjs';

export default function validate(rules: {[key: string]: string}, data: {[key: string]: any}, minKeysLength = 2): void {
  const keysLength = Object.keys(data);
  const validation = new Validator(data, rules);
  if (keysLength.length < minKeysLength) throw new UserInputError('UserInputLength');
  else if (validation.fails()) {
    throw new UserInputError('ValidationError:', validation.errors.errors);
  }
}
