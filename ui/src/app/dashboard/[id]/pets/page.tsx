import { notFound } from 'next/navigation';
import { type PetSchemaType } from '@/utils/schemas';
import { apiAddress } from '@/utils/variables';
import VerticalProductCard from '@/components/petsCard.tsx/VerticalPetsCard';

async function fetchPet(id: string) {
  const res = await fetch(`${apiAddress}/api/users/${id}/pets`, {
    cache: 'no-store'
  });
  if (!res.ok) return undefined;
  return res.json();
}

const PetDetails = async ({ params }: { params: { id: string } }) => {
  // const { pets }: { pets: PetSchemaType[] | [] } = await fetchPet(params.id);
  const user = await fetchPet(params.id);

  if (!user) {
    notFound();
  }

  const { pets }: { pets: PetSchemaType[] | [] } = user;

  return (
    <main className='min-h-[calc(100vh-30rem)] md:min-h-[calc(100vh-15rem)]'>
      <header className='m-auto py-8 bg-secondaryBg pt-28 '>
        <h1 className='text-2xl font-semibold mb-4 md:text-center px-3 md:px-14 lg:px-32 text-center'>
          Your Pets
        </h1>
      </header>
      {pets.length < 1 ? (
        <p className='text-center text-3xl'>You have no uploaded pet</p>
      ) : (
        <div className='pl-3 md:pl-6 w-full py-11 grid gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-6 gtc grid-flow-row'>
          {pets.map((v) => (
            <VerticalProductCard
              key={v.id}
              id={v.id!}
              img={v.imgs[0]}
              productName={`${v.petName} - ${v.breed}`}
              location={`${v.city} ${v.state}`}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default PetDetails;
