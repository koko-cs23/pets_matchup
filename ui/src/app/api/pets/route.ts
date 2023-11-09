import { NextResponse } from 'next/server';
import { PetSchema } from '@/utils/schemas';
import { db } from '@/db/db';
import { pets, categories } from '@/db/schema/schema';
import { and, ilike, or } from 'drizzle-orm';
import { places, cat } from '@/utils/jsons';
import { revalidatePath } from 'next/cache';

export const GET = async (request: Request, { nextUrl }: { nextUrl: any }) => {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const q = searchParams?.get('q') || null;
  const breed = searchParams?.get('breed') || '_';
  const gender = searchParams?.get('gender') || '_';
  const country = searchParams?.get('country') || '_';
  const state = searchParams?.get('state')
    ? places?.[+searchParams?.get('state')!]?.name
    : '_';
  const category = searchParams?.get('category')
    ? cat?.[+searchParams?.get('category')!]?.name
    : '_';
  const city = searchParams?.get('city') || '_';
  const purebred = searchParams?.get('purebred') || '_';
  console.log({ breed, category, state, city });
  console.log({ q });
  try {
    let allPets: any = [];
    if (q) {
      allPets = await db.query.pets.findMany({
        where: or(
          ilike(pets.breed, `%${q}%`),
          ilike(pets.purebred, `%${q}%`),
          ilike(pets.age, `%${q}%`),
          ilike(pets.gender, `%${q}%`),
          ilike(pets.category, `%${q}%`),
          ilike(pets.country, `%${q}%`)
        ),
        limit: 60
      });
    } else if (
      breed ||
      gender ||
      category ||
      country ||
      state ||
      city ||
      purebred
    ) {
      console.log({ breed, category, state, city });
      allPets = await db.query.pets.findMany({
        where: and(
          ilike(pets.breed, `%${breed}%`),
          ilike(pets.purebred, `%${purebred}%`),
          ilike(pets.gender, `%${gender}%`),
          ilike(pets.country, `%${country}%`),
          ilike(pets.state, `%${state}%`),
          ilike(pets.city, `%${city}%`),
          ilike(pets.category, `%${category}%`)
        ),
        limit: 60
      });
    } else {
      allPets = await db.query.pets.findMany({
        where: ilike(pets.city, '*'),
        limit: 60
      });
    }
    if (!allPets)
      return new NextResponse(JSON.stringify({ message: 'No pet found' }), {
        status: 401
      });
    return new NextResponse(JSON.stringify(allPets), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ err, message: 'Something went wrong' }),
      {
        status: 500
      }
    );
  }
};

export const POST = async (request: Request, res: Response) => {
  // validate data
  const {
    age,
    breed,
    category,
    city,
    country,
    description,
    gender,
    imgs,
    petName,
    purebred,
    state,
    userId
  } = PetSchema.parse(await request.json());
  try {
    let [pet] = await db
      .insert(pets)
      .values({
        age,
        breed,
        city,
        country,
        description,
        gender,
        imgs,
        petName,
        purebred,
        state,
        category,
        userId: userId!
      })
      .returning();
    if (pet) {
      revalidatePath('/');
      revalidatePath('/pet');
      return new NextResponse(JSON.stringify({ pet }), {
        status: 201
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error, message: 'Something went wrong' }),
      {
        status: 500
      }
    );
  }
};

// Not releveant. Just for creating the categories beforehand.
export const PUT = async (request: Request, res: Response) => {
  try {
    let [cat] = await db.insert(categories).values({ name: 'Cat' }).returning();
    let [dog] = await db.insert(categories).values({ name: 'Dog' }).returning();
    if (cat) {
      return new NextResponse(JSON.stringify({ cat, dog }), {
        status: 201
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error, message: 'Something went wrong' }),
      {
        status: 500
      }
    );
  }
};
