export type MiddlewareFn = (root, args, context, info, next) => Promise<any>;
