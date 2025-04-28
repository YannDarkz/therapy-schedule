import  { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    // role: { type: String, default: 'client' },

});

const UserModel = models.User || model('User', UserSchema, 'register');

export default UserModel;
