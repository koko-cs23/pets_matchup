import React from 'react';

export default function Loading() {
  return (
    <div className='w-full py-28'>
      <div className='w-full h-80 flex items-center justify-center animate-bounce-slow py-8 pt-36'>
        <svg
          width='200'
          height='200'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='opacity-20'>
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
      </div>
    </div>
  );
}
