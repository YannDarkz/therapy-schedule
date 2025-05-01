import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function POST(req: Request) {
  try {
    const { userId, appointment } = await req.json();

    if (!userId || !appointment) {
      return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 });
    }

    await connectDB();

    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    // Adiciona o novo agendamento no array de appointments
    user.appointments.push(appointment);
    await user.save();

    const { password, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({ message: 'Agendamento salvo com sucesso', user: userWithoutPassword }, { status: 200 });
  } catch (error:any) {
    console.error('Erro ao agendar:', error.message, error.stack);
    return NextResponse.json({ message: 'Erro interno do servidor', error: error.message }, { status: 500 });
  }
}
