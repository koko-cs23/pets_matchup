'use client';

import Link from 'next/link';
import { useState } from 'react';
import Dropdown from './DropDown';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [ham, setHam] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [query, setQuery] = useState('');
  const session: any = useSession();
  const router = useRouter();

  return (
    <header
      // ref={navRef}
      className='bg-secondaryBg flex items-center justify-between px-3 text-sm py-5 md:px-14 lg:px-32 text-primaryText fixed w-full z-20 top-0'>
      <Link
        href={'/'}
        className='flex gap-1 md:px-2 md:py-1 md:rounded-lg bg-primaryBg rounded-full md:bg-white items-center md:hover:bg-slate-200 text-black'>
        <svg
          aria-hidden='true'
          width='32'
          height='32'
          viewBox='0 0 32 32'
          className='text-primaryText md:text-black'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9.20344 16.1751C9.37974 15.7495 9.63814 15.3628 9.96389 15.037C10.2896 14.7113 10.6764 14.4529 11.102 14.2766C11.5276 14.1003 11.9838 14.0095 12.4445 14.0095C12.9051 14.0095 13.3613 14.1003 13.7869 14.2766C14.2125 14.4529 14.5993 14.7113 14.925 15.037L15.9525 16.0645L16.9799 15.037C17.6378 14.3791 18.5301 14.0095 19.4605 14.0095C20.3909 14.0095 21.2832 14.3791 21.9411 15.037C22.599 15.6949 22.9685 16.5872 22.9685 17.5176C22.9685 18.448 22.599 19.3403 21.9411 19.9981L15.9525 25.9867L9.96389 19.9981C9.63814 19.6724 9.37974 19.2857 9.20344 18.8601C9.02714 18.4344 8.9364 17.9783 8.9364 17.5176C8.9364 17.0569 9.02714 16.6007 9.20344 16.1751Z'
            stroke='currentColor'
            strokeWidth='1.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle
            cx='13.2933'
            cy='8.58939'
            r='1.91173'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <circle
            cx='19.6564'
            cy='8.58939'
            r='1.91173'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <circle
            cx='7.3101'
            cy='11.6788'
            r='1.91173'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <circle
            cx='25.3548'
            cy='11.6788'
            r='1.91173'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <rect
            x='1.05421'
            y='1.14918'
            width='29.8916'
            height='29.8916'
            rx='14.9458'
            stroke='currentColor'
            strokeWidth='1.4'
          />
        </svg>
        <i className='hidden md:block'>PetsMatchUp</i>
      </Link>
      <nav
        id='navigation'
        className={`flex gap-2 md:items-center md:gap-1 w-full left-0 absolute transition-transform z-50 bg-secondaryBg flex-col py-8 px-2 top-16 md:w-auto md:static md:bg-transparent md:flex-row md:translate-x-0 md:py-0 ${
          !ham && 'transition-transform -translate-x-full'
        }`}>
        <Dropdown
          value={'Categories'}
          content={['Dog', 'Cat']}
          tab={+ham - 1}
        />
        <hr className='dark:opacity-30' />
        <Link href='#'>
          <p className='table px-3 w-full cursor-pointer'>Pets For Sale</p>
        </Link>
        <hr className='dark:opacity-30' />
        <Link href='#'>
          <p className='table px-3 w-full cursor-pointer'>Blog</p>
        </Link>
        <hr className='dark:opacity-30' />
        <search className='px-3 relative'>
          <input
            type='search'
            placeholder='Search'
            id='search'
            className='rounded-lg md:w-32 w-full py-2 px-5 border border-ctaColor focus-within:w-full text-black peer'
            value={query}
            onKeyDown={(e) => {
              e.key === 'Enter' && router.push(`/pet?q=${query}`);
            }}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <svg
            width='24'
            height='24'
            viewBox='0 0 27 26'
            fill='none'
            className='absolute right-5 bottom-[6px] text-slate-600 peer-focus-within:hidden'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M8.33324 18.1667L12.052 14.4479M12.052 14.4479C12.4107 14.8126 12.838 15.1027 13.3094 15.3014C13.7808 15.5001 14.2868 15.6035 14.7983 15.6056C15.3098 15.6078 15.8167 15.5086 16.2897 15.3139C16.7628 15.1191 17.1925 14.8327 17.5543 14.471C17.916 14.1093 18.2026 13.6796 18.3974 13.2067C18.5923 12.7337 18.6916 12.2268 18.6895 11.7153C18.6875 11.2038 18.5842 10.6977 18.3857 10.2263C18.1871 9.7549 17.8971 9.32747 17.5325 8.96868C16.8039 8.25166 15.8215 7.8516 14.7992 7.85564C13.777 7.85968 12.7977 8.2675 12.0748 8.99025C11.3519 9.71301 10.9439 10.6922 10.9396 11.7144C10.9353 12.7366 11.3351 13.7192 12.052 14.4479ZM25.125 13C25.125 14.5266 24.8243 16.0383 24.2401 17.4487C23.6559 18.8591 22.7996 20.1406 21.7201 21.2201C20.6406 22.2996 19.3591 23.1559 17.9486 23.7401C16.5382 24.3243 15.0265 24.625 13.4999 24.625C11.9733 24.625 10.4616 24.3243 9.05121 23.7401C7.6408 23.1559 6.35926 22.2996 5.27977 21.2201C4.20029 20.1406 3.34399 18.8591 2.75978 17.4487C2.17557 16.0383 1.87488 14.5266 1.87488 13C1.87488 9.91683 3.09966 6.95996 5.27977 4.77984C7.45989 2.59972 10.4168 1.37494 13.4999 1.37494C16.5831 1.37494 19.54 2.59972 21.7201 4.77984C23.9002 6.95996 25.125 9.91683 25.125 13Z'
              stroke='currentColor'
              strokeOpacity='0.8'
              strokeWidth='2.58334'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </search>
      </nav>

      {/* <Link href={'/profile'} className='text-inherit contents '> */}
      <div className='static md:relative flex transition-all'>
        <button
          type='button'
          aria-expanded={showUserDropdown}
          id='user'
          onClick={() => {
            setShowUserDropdown(!showUserDropdown);
            setHam(false);
          }}
          className='group relative cursor-pointer p-1 rounded-full border-solid border-[1px] border-primaryText bg-primaryBg'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
        </button>
        <div
          aria-hidden={showUserDropdown}
          className={`grid transition-all absolute justify-center -translate-x-1/2 left-1/2 w-full bg-secondaryBg top-16 md:w-48 md:top-11 rounded-b-xl ${
            showUserDropdown
              ? 'grid-rows-[1fr] p-5  md:border md:border-primaryText'
              : 'grid-rows-[0fr]'
          }`}>
          <div
            className='max-h-full overflow-hidden items-center w-max flex flex-col gap-3'
            onClick={() => setShowUserDropdown(false)}>
            <Link href={`/dashboard/${session.data?.user?.id}`}>Dashboard</Link>
            {/* <Link href={`/dashboard/${session.data?.user?.id}`}>Profile</Link> */}
            <Link href={'#'}> My Pets</Link>
            {/* {session.status === 'authenticated' && ( */}
            <Link href={'/pet/new-pet'}> Upload a Pet</Link>
            {/* )} */}
            {session.status !== 'authenticated' ? (
              <Link href={'/auth/login'}>
                {' '}
                <button className='btn w-[70vw] md:w-32'>Login</button>
              </Link>
            ) : (
              <button
                className='btn w-[70vw] md:w-32'
                onClick={() => signOut()}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <button
        tabIndex={0}
        className={
          'group border-[1px] border-primaryText py-3 px-2 relative bg-primaryBg shadow-md md:hidden rounded-lg'
        }
        aria-expanded={ham}
        aria-controls='navigation'
        aria-label='Show navigation menus'
        onClick={() => {
          setHam(!ham);
          setShowUserDropdown(false);
        }}>
        <span
          className={`relative h-[2px] block w-5 bg-primaryText before:absolute before:top-[-6px] before:left-0 before:h-[2px] before:w-full before:bg-primaryText before:content-[""] before:transition-transform after:absolute after:top-[6px] after:left-0 after:h-[2px] after:w-full after:bg-primaryText after:content-[""] after:transition-transform  ${
            ham &&
            'before:-rotate-45 after:rotate-45 before:-translate-x-[5px] before:translate-y-[1px] before:transition-transform after:-translate-x-[5px] after:-translate-y-[1px] after:scale-x-75 before:scale-x-75 after:transition-transform'
          }`}></span>
      </button>
    </header>
  );
};

export default NavBar;
