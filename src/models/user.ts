import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: [true, 'mail is necessary'],
  },
  password: {
    type: String,
    unique: true,
    require: ['password is necessary'],
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, ...userObject } = this.toObject();

  return userObject;
};

export default model('User', UserSchema);
