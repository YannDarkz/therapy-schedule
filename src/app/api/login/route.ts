import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const user = await UserModel.findOne({ 'email': email.trim() });

    console.log('Usuário encontrado:', user);

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 });
  }
}
