import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String, unique: true 
  },

  password: {
    type: String,
    required: true,
  },
  role:
  {
    type: String, default: 'client'
  },

});

const UserModel = models.User || model('User', UserSchema, 'register');

export default UserModel;
