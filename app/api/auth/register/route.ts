import { NextResponse } from 'next/server';
import { createUser } from '@/lib/database';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { createRateLimitMiddleware, rateLimitConfigs } from '@/lib/rate-limit';
import { NextRequest } from 'next/server';
import { logError } from '@/lib/logger';

const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const rateLimitMiddleware = createRateLimitMiddleware(rateLimitConfigs.auth);

/**
 * Handles POST requests for user registration.
 * It validates the input, hashes the password, creates a new user, and applies rate limiting.
 * @param req - The incoming NextRequest object.
 * @returns A JSON response with the new user data or an error.
 */
export async function POST(req: NextRequest) {
  const isAllowed = rateLimitMiddleware(req);
  if (!isAllowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { email, password } = registerUserSchema.parse(body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email, hashedPassword);

    if (!user) {
      // This case handles general errors from createUser, assuming it returns null on failure.
      // A more specific error might be thrown for duplicate users, which is handled below.
      return NextResponse.json({ error: 'Could not create user' }, { status: 500 });
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    await logError(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    // Check for unique constraint violation (user already exists)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
