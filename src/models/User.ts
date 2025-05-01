import { Schema, model, models } from 'mongoose';

const AppointmentSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  professional: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmado', 'cancelado', 'finalizado'],
    default: 'pendente',
  }
}, { _id: false });

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
  appointments: [AppointmentSchema]

});

const UserModel = models.User || model('User', UserSchema, 'register');

export default UserModel;
