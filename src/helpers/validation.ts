import Validator from 'validatorjs';

export default function validate(rules, data) {
  const validation = new Validator(data, rules);

  if (validation.fails()) return validation.errors.errors;
  return validation.passes();
}
