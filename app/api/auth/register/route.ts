import { NextResponse } from 'next/server';
import { createUser } from '@/lib/database';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = registerUserSchema.parse(body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email, hashedPassword);

    if (!user) {
      return NextResponse.json({ error: 'User already exists or another error occurred' }, { status: 400 });
    }

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
