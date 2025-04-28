import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Defina a variável de ambiente MONGODB_URI');
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log('Já conectado ao MongoDB');
    return;
  }

  console.log('Conectando ao MongoDB...');
  await mongoose.connect(MONGODB_URI, {
    dbName: 'users',
  });
}