import { Schema, model } from 'mongoose';
import { TUser, UserStatic } from './User.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser, UserStatic>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, response) => {
        delete response.password;
        delete response.__v;
        return response;
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TUser, UserStatic>('User', userSchema);
