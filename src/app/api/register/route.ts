import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();
    console.log("role karai", role);
    

    await connectDB(); // conecta no MongoDB

    // Verificar se o usuário já existe
    const existingUser = await UserModel.findOne({ email: email.trim() });

    if (existingUser) {
      return NextResponse.json({ message: 'Usuário já existe' }, { status: 400 });
    }

    // Criar novo usuário
    const newUser = new UserModel({
      name: name.trim(),
      email: email.trim(),
      password: password, // **Importante**: em produção, você deveria encriptar a senha!
      client: role.trim()
    });

    await newUser.save(); // Salva o usuário no MongoDB

    // Remover a senha da resposta
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 });
  }
}