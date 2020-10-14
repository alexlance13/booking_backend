import userResolver from './user';

export default {
  Mutation: {
    ...userResolver,
  },
};
