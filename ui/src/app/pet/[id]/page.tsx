import { ImgCarousel } from '@/components/helpers/ImgCarousel';
import { FaRegClock } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const PetDetails = () => {
  const imgs = [
    '/24852466_1659565300793672_2707528689187707034_n.jpg',
    '/IMG_1272.JPG',
    '/AmericanEskimo-exercise.jpeg',
    '/IMG_1272.JPG',
    '/IMG_1276.JPG',
    '/IMG_1286.JPG',
    '/Pet Owners and Cancer Treatment.jpg',
    '/puppy-kitten-heart.png'
  ];

  return (
    <main>
      <header className='m-auto py-8 bg-secondaryBg pt-28 '>
        <h1 className='text-2xl font-semibold mb-4 md:text-center px-3 md:px-14 lg:px-32'>
          Eskimo Purebred 2 years male... Ready for mating
        </h1>
      </header>
      <div className='py-16 px-3 md:px-14 lg:px-32 flex flex-col gap-3'>
        <ImgCarousel imgs={imgs} />
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
            <h6 className='font-bold opacity-80'>Details:</h6>{' '}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus nostrum laudantium vero quo id eligendi provident!
              Voluptas laudantium ad aut accusantium sed provident. Culpa in
              molestiae facilis quidem nostrum cupiditate.
            </p>
          </span>
          <span className='w-full flex gap-2'>
            {/* <button className='px-4 py-2 bg-ctaColor rounded-lg text-white'>
              Show Contact
            </button> */}
            <h5 className='font-bold opacity-80'>Owner&apos;s Contact:</h5>
            <a href='tel:+2348053662673'>+2348053662673</a>
          </span>
        </div>
      </div>
    </main>
  );
};

export default PetDetails;
