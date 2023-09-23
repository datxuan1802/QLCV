import { Types } from 'mongoose';

export const getObjectId = (id: string) => {
  return new Types.ObjectId(id);
};
