import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const VerticalProductCard = ({
  productName,
  location
}: {
  productName: string;
  location: string;
}) => {
  return (
    <Link
      href={``}
      className='shadow-md dark:shadow-[#8b5cf6] dark:shadow-sm rounded-md'>
      <Image
        src='/IMG_1272.JPG'
        // placeholder='blur' TODO: add shimmer img for placeholder
        width={250}
        height={144}
        alt=''
        className='object-cover rounded-t-md h-36 w-full'
        priority
      />
      <div className='h-[92px] bg-secondaryBg w-full flex flex-col px-2 justify-center gap-[1px] rounded-b-md'>
        <h5 className=''>{productName}</h5>
        <p className='font-light text-xs'>{location}</p>
      </div>
    </Link>
  );
};

export default VerticalProductCard;
