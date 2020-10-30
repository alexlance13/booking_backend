import { UserInputError } from 'apollo-server-express';
import Validator from 'validatorjs';

Validator.register('myDateFormat', (value: string) => /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value), // date regexp
  'The date not in the format YYYY-MM-DD.');
Validator.register('notPast', (value: string) => new Date(value) >= new Date(), 'The date is in past'); // not past or today
Validator.register('notFuture', (value: string) => new Date(value) < new Date(), 'The date is in future'); // not future (for admin)

Validator.register('userName', (value: string) => /[a-zA-Zа-яА-Я]*/.test(value));

const sumToConvertInMonths = (1000 * 60 * 60 * 24 * 30); // convert ms to months

Validator.register('lessThenMonth', (value: string, requirement: string) => (Date.parse(value) - Date.parse(requirement)) / sumToConvertInMonths <= 1,
  'You can\'t book apartment for more then a 30 days');

export default function validate(rules: {[key: string]: string}, data: {[key: string]: any}, minKeysLength = 2): void {
  const keysLength = Object.keys(data);
  const validation = new Validator(data, rules);
  if (keysLength.length < minKeysLength) throw new UserInputError('Validation error.');
  else if (validation.fails()) {
    console.error('Validation: ', validation.errors.errors);
    throw new UserInputError(Object.values(validation.errors.errors).shift().toString());
  }
}
