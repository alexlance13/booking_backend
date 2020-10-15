import {create} from '../../services/user.service'

export default {
  createUser: async (obj, args) => create(args.user)
};
