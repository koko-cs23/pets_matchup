import Hero from '@/components/Hero';
import PetsFilter from '@/components/PetsFilter';
import Image from 'next/image';

export default function Home() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <main className='min-h-screen'>
      <Hero />
      <h2>Available Pets Looking for Mates</h2>
      {/* <PetsFilter /> */}
      <div className='flex flex-wrap gap-2 justify-between'>
        {arr.map((o, i) => (
          <div key={i} className='w-1/4 min-w-[7rem] h-7 bg-ctaColor'></div>
        ))}
      </div>
    </main>
  );
}
