import { NextResponse } from 'next/server';
import { db } from '@/db/db';

export const GET = async () => {
  try {
    const allPets = await db.query.pets.findMany();
    if (!allPets)
      return new NextResponse(JSON.stringify({ message: 'No pet found' }), {
        status: 400
      });
    return new NextResponse(JSON.stringify(allPets), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ err, message: 'No pets found' }), {
      status: 500
    });
  }
};
