import validate from "../helpers/validation";

export async function userValidation(root, args, {req, res}, info, next) { 
  const {apartment} = req.body.variables;
  
  const messagesObj = validate({ name: 'apartment', value : apartment });
  if(Object.keys(messagesObj).length) {
    return res.status(400).send(messagesObj);
  }
  console.log('Success')
  const result = await next();
  return result; 
}