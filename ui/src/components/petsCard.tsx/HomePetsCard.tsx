import { PetSchemaType } from '@/utils/schemas';
import VerticalProductCard from './VerticalPetsCard';

const HomePetsCard = async () => {
  const data = await fetch('http://localhost:3000/api/pets', {
    cache: 'no-store'
  });
  const pets: PetSchemaType[] = await data.json();
  console.log(pets);

  return (
    <div className='pl-3 md:pl-6 w-full py-11 grid gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-6 gtc grid-flow-row'>
      {pets.map((v) => (
        <VerticalProductCard
          key={v.id}
          id={v.id!}
          location={`${v.city}, ${v.state}`}
          productName={`${v.breed} ${
            v.purebred == 'Yes' ? 'purebred' : 'mixed'
          } (${v.age}) ${v.gender}`}
          img={v.imgs[0]}
        />
      ))}
    </div>
  );
};

export default HomePetsCard;
