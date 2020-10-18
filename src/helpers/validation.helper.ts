import { UserInputError } from 'apollo-server-express';
import Validator from 'validatorjs';

Validator.register('myDateFormat', (value) => value.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/), // date regexp
  'The date not in the format YYYY-MM-DD.');
Validator.register('notPast', (value) => new Date(value) >= new Date(), 'The date is in past'); // not past or today

const sumToConvertInYears = (1000 * 60 * 60 * 24 * 365); // convert ms to years

Validator.register('lessThenYear', (value, requirement) => (Date.parse(value) - Date.parse(requirement)) / sumToConvertInYears <= 1,
  'You can\'t book apartment for more then a year');

export default function validate(rules: {[key: string]: string}, data: {[key: string]: any}, minKeysLength = 2): void {
  const keysLength = Object.keys(data);
  const validation = new Validator(data, rules);
  if (keysLength.length < minKeysLength) throw new UserInputError('UserInputLength');
  else if (validation.fails()) {
    throw new UserInputError('ValidationError:', validation.errors.errors);
  }
}
