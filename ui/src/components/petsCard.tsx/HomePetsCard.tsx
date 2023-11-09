import { PetSchemaType } from '@/utils/schemas';
import VerticalProductCard from './VerticalPetsCard';
import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { and, ilike, or } from 'drizzle-orm';
import { pets } from '@/db/schema/schema';
import { cat, places } from '@/utils/jsons';

export const dynamic = 'force-dynamic';

async function fetchPets({
  query = null,
  breed = '_',
  category = '_',
  city = '_',
  purebred = '_',
  country = '_',
  state = '_',
  gender = '_'
}) {
  'use server';
  try {
    let allPets: any = [];
    // const q = props.q;
    // const { breed, gender, category, country, state, city, purebred } = props;
    if (query) {
      allPets = await db.query.pets.findMany({
        where: or(
          ilike(pets.breed, `%${query}%`),
          ilike(pets.purebred, `%${query}%`),
          ilike(pets.age, `%${query}%`),
          ilike(pets.gender, `%${query}%`),
          ilike(pets.category, `%${query}%`),
          ilike(pets.country, `%${query}%`)
        ),
        limit: 24
      });
    } else {
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
        limit: 24,
        orderBy: (pets, { desc }) => [desc(pets.updatedAt)]
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
}

const HomePetsCard = async (props: any) => {
  // const data = query
  //   ? await fetch(`${apiAddress}/api/pets?q=${query}`, {
  //       cache: 'no-store'
  //     })
  //   : await fetch(`${apiAddress}/api/pets`, {
  //       cache: 'no-store'
  //     });

  const v = await fetchPets(props);
  const pets: PetSchemaType[] = await v.json();

  // const pets: PetSchemaType[] = await data.json();
  // console.log(pets);
  if (pets.length) {
    return (
      <div className='pl-3 md:pl-6 w-full py-11 grid gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-6 gtc grid-flow-row'>
        {props?.home
          ? pets
              .slice(0, 12)
              .map((v) => (
                <VerticalProductCard
                  key={v.id}
                  id={v.id!}
                  location={`${v.city}, ${v.state}`}
                  productName={`${v.breed} ${v.purebred.toLocaleLowerCase()} (${
                    v.age
                  }) ${v.gender}`}
                  img={v.imgs[0]}
                />
              ))
          : pets.map((v) => (
              <VerticalProductCard
                key={v.id}
                id={v.id!}
                location={`${v.city}, ${v.state}`}
                productName={`${v.breed} ${v.purebred.toLocaleLowerCase()} (${
                  v.age
                }) ${v.gender}`}
                img={v.imgs[0]}
              />
            ))}
      </div>
    );
  } else
    return (
      <p className='text-3xl text-center py-9'>No pet matches your query</p>
    );
};

export default HomePetsCard;
