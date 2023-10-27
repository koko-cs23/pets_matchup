import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { RegisterSchema } from '@/utils/schemas';
import { users } from '@/db/schema/schema';

export const POST = async (request: Request) => {
  const { password, email, fullName, phone } = RegisterSchema.parse(
    await request.json()
  );
  try {
    // Hash the password with cryptoJS and create a new User
    // TODO: check for existing user
    const register = await db
      .insert(users)
      .values({
        passwordHash: CryptoJS.AES.encrypt(
          password,
          process.env.PASSWORD_SECRET!
        ).toString(),
        email: email.toLowerCase(),
        name: fullName,
        phone: phone.toString()
      })
      .returning();
    const [{ passwordHash, ...rest }] = register;
    return new NextResponse(JSON.stringify({ ...rest }), {
      status: 201
    });
  } catch (error) {
    console.log(error);
    // if (error.code === 'P2002') {
    // 	return res.status(401).json({
    // 		emailError: 'A user with this email already exists'
    // 	});
    // }
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong' }),
      {
        status: 500
      }
    );
  }
};
