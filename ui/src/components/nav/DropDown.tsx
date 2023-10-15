import Link from 'next/link';
import { useState } from 'react';

const Dropdown = ({
  value,
  content,
  tab
}: {
  value: string;
  content: string[];
  tab: number;
}) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <span className='relative'>
      <button
        className='flex text-sm gap-1 px-3 items-center w-full md:w-min'
        onClick={() => setDropdown(!dropdown)}
        tabIndex={tab}>
        <p>{value}</p>

        {/* <span
          className={
            dropdown
              ? 'rotate-180 transition-transform'
              : 'rotate-0 transition-transform'
          }> */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={`w-4 h-4 relative top-[2px] transition-transform ${
            dropdown && 'rotate-180'
          }`}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
        {/* </span> */}
      </button>
      <div
        className={`flex flex-col gap-1 relative top-1 max-h-0 transition-all ml-1 overflow-hidden md:top-8 md:-left-2 px-8 md:absolute md:bg-secondaryBg md:text-primaryText md:w-32 opacity-0 duration-500 md:text-gray-600 ${
          dropdown && '!max-h-52 !opacity-100 pb-4'
        }`}>
        {content.map((item: string, i: number) => (
          <div key={i}>
            <Link href={item} tabIndex={+dropdown - 1}>
              {item}
            </Link>
          </div>
        ))}
      </div>
    </span>
  );
};

export default Dropdown;
