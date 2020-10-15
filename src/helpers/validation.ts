import Validator from 'validatorjs';

export default function validate(data) {
  const rules = {
    user: {
      first_name: 'required|min:3|max:25|alpha',
      last_name: 'required|min:3|max:25|alpha',
      email: 'required|email',
      role: 'required|alpha'
    },
    apartment: {
      name: 'required|alpha_num|min:3|max:25',
      description: 'required|string|min:3|max:800',
      image: 'required|url',
      price: 'required|numeric|min:1',
      roomsCount: 'required|numeric|min:1|max:20',
      seller: 'required|alpha_num'
    }
  }
  
  const validation = new Validator(data.value, rules[data.name]);

  if(validation.fails()) return validation.errors.errors
  return validation.passes();
}
