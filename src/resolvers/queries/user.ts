import { getById } from '../../services/user.service';

export default {
  getUserById: (obj, args) => getById(args.id),
};
