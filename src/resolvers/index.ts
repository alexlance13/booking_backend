import mutationResolvers from './mutations';
import queryResolvers from './queries';

export default {
  ...queryResolvers,
  ...mutationResolvers,
};
