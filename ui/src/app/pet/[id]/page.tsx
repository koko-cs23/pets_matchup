'use client';

import { FaRegClock } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import navBtn from '../../../../public/carousel-nav.png';
import Image from 'next/image';
import { useState } from 'react';

const PetDetails = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const imgs = [1, 2, 3, 4];

  const prevImg = () => {
    setImgIndex((index) => {
      if (index === 0) {
        return 0;
      } else return index - 1;
    });
  };

  const nextImg = () => {
    setImgIndex((index) => {
      if (index === imgs.length - 1) {
        return index;
      } else return index + 1;
    });
  };

  return (
    <main>
      <header className='m-auto py-8 bg-secondaryBg pt-16 '>
        <h1 className='text-2xl font-semibold mb-4 md:text-center'>
          Eskimo Purebred 2 years male... Ready for mating
        </h1>
      </header>
      <div className='py-16 px-3 md:px-14 lg:px-32 flex flex-col gap-3'>
        <div>
          <div className='w-full aspect-4/3 bg-ctaColor rounded-xl relative'>
            <button
              className='absolute opacity-0 hover:opacity-100 transition-all top-1/2 left-3 rotate-180'
              onClick={prevImg}>
              <Image src={navBtn} alt='previous image' className='h-1/6' />
            </button>
            <p className='text-center text-8xl'>{imgIndex}</p>
            <button
              className='absolute opacity-0 hover:opacity-100 transition-all top-1/2 right-3'
              onClick={nextImg}>
              <Image src={navBtn} alt='next image' className='h-1/6' />
            </button>
          </div>
          <div className='flex - gap-2'>
            {imgs.map((v, i) => (
              <span key={i}>
                <p
                  onClick={() => setImgIndex(v)}
                  className='w-14 h-14 border cursor-pointer'>
                  {v}
                </p>
              </span>
            ))}
          </div>
        </div>
        <span className='flex flex-wrap justify-between gap-x-14 opacity-70'>
          <span className='flex items-center gap-1'>
            <FaRegClock /> <i>Posted 2 days ago</i>
          </span>
          <span className='flex items-center gap-1'>
            <IoLocationOutline /> <i>Victoria Island, Lagos, Nigeria</i>
          </span>
        </span>
        <hr className='opacity-60' />
        <div className='flex flex-wrap gap-3 justify-between'>
          <span className='min-w-[45%] md:min-w-[30%]'>
            <h6 className='font-bold opacity-80'>Name:</h6> <p>Teddy</p>
          </span>
          <span className='min-w-[45%] md:min-w-[30%]'>
            <h6 className='font-bold opacity-80'>Breed:</h6> <p>Eskimo</p>
          </span>
          <span className='min-w-[45%] md:min-w-[30%]'>
            <h6 className='font-bold opacity-80'>Age:</h6> <p>3 years</p>
          </span>
          <span className='min-w-[45%] md:min-w-[30%]'>
            <h6 className='font-bold opacity-80'>Gender:</h6> <p>Male</p>
          </span>
          <span className='min-w-[45%] md:min-w-[30%]'>
            <h6 className='font-bold opacity-80'>Weight:</h6> <p>34kg</p>
          </span>
          <span className='min-w-[45%] md:min-w-[30%]'>
            <h6 className='font-bold opacity-80'>Purebred:</h6> <p>Yes</p>
          </span>
          <hr className='opacity-60 w-full' />
          <span className='w-full'>
            <h6>Details:</h6>{' '}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus nostrum laudantium vero quo id eligendi provident!
              Voluptas laudantium ad aut accusantium sed provident. Culpa in
              molestiae facilis quidem nostrum cupiditate.
            </p>
          </span>
          <span className='w-full flex justify-center'>
            <button className='px-4 py-2 bg-ctaColor rounded-lg text-white'>
              Owner&apos;s Contact
            </button>
          </span>
        </div>
      </div>
    </main>
  );
};

export default PetDetails;
