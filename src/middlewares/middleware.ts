export async function middleware(root, args, {req, res}, info, next) { 
  // you can modify root, args, context, info
  console.log(req.body)
  const result = await next();
  // you can modify result
  return result; // you must return value
}