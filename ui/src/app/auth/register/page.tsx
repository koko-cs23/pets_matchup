'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ImSpinner } from 'react-icons/im';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterSchemaType } from '../../../utils/schemas';
import { useRouter } from 'next/navigation';
import { apiAddress } from '../../../utils/variables';
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { BiShow, BiHide } from 'react-icons/bi';

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassWord] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterSchemaType>({
    mode: 'all',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(RegisterSchema)
  });

  const fields = watch();

  console.log(errors);

  const signUp = async ({
    email,
    password,
    fullName,
    phone
  }: RegisterSchemaType) => {
    const res = await fetch(`${apiAddress}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        fullName,
        phone
      })
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/login');
    } else if (data.message == 'This email address is already taken') {
      setError('email', {
        type: 'server',
        message: data.message
      });
    } else {
      alert(data?.message);
    }
  };

  return (
    <main className='min-h-[75vh] rounded-lg shadow-md text-center pb-12 mt-28 my-8 px-3 m-3 flex items-center dark:bg-secondaryBg md:mx-14 md:px-16 lg:mx-32'>
      <div className='flex gap-11 flex-col w-full'>
        <h2 className='text-secondary text-4xl font-medium'>Register</h2>
        <form
          onSubmit={handleSubmit(signUp)}
          className='flex flex-col gap-7 dark:text-gray-100'>
          <div className='relative'>
            <span className='absolute right-0 top-1'>
              <AiOutlineUser />
            </span>
            <input
              {...register('fullName')}
              placeholder='Full Name'
              type='text'
              className='w-full focus-visible:outline-0 border-b-2 border-gray-400  pr-7focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-orange-500 bg-transparent'
            />
            <span className='text-red-400 dark:text-red-300 text-xs'>
              {' '}
              {errors?.fullName?.message}
            </span>
          </div>
          <div className='relative'>
            <span className='absolute right-0 top-1'>
              <AiOutlineMail />
            </span>
            <input
              type='email'
              {...register('email')}
              placeholder='Email'
              className='w-full focus-visible:outline-0 border-b-2 border-gray-400  pr-7focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-orange-500 bg-transparent'
            />
            <span className='text-red-400 dark:text-red-300 text-xs'>
              {' '}
              {errors.email?.message}
            </span>
          </div>
          <div className='relative'>
            <span className='absolute right-0 top-1'>
              <AiOutlinePhone />
            </span>
            <input
              type='number'
              inputMode='numeric'
              {...register('phone')}
              placeholder='Phone number'
              className='w-full focus-visible:outline-0 border-b-2 border-gray-400  pr-7focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-orange-500 bg-transparent'
            />
            <span className='text-red-400 dark:text-red-300 text-xs'>
              {' '}
              {errors.phone?.message}
            </span>
          </div>
          <div className='relative'>
            <span
              className='absolute right-0'
              onClick={() => setShowPassWord(!showPassword)}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder='Password'
              name='password'
              className='w-full focus-visible:outline-0 border-b-2 border-gray-400  pr-7focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-orange-500 bg-transparent'
            />
            <span className='text-red-400 dark:text-red-300 text-xs'>
              {' '}
              {errors.password?.message}
            </span>
          </div>
          <div className='relative'>
            <span
              className='absolute right-0'
              onClick={() => setShowPassWord(!showPassword)}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              name='confirmPassword'
              placeholder='Confirm Password'
              className='w-full focus-visible:outline-0 border-b-2 border-gray-400  pr-7focus-visible:border-b-[1px] focus-visible:border-solid focus-visible:border-orange-500 bg-transparent'
            />
            <span className='text-red-400 dark:text-red-300 text-xs'>
              {' '}
              {errors.confirmPassword?.message}
            </span>
          </div>
          <label>
            <input
              type='checkbox'
              {...register('agree')}
              // onClick={(e) => setAgree(!agree)}
            />
            I agree with the
            <Link href={'/privacy-policy'}>Privacy Policy</Link> &
            <Link href={'/terms-condition'}>Terms and Condition</Link>
          </label>
          <span role='alert' className='text-red-400 dark:text-red-300 text-xs'>
            {errors.agree?.message}
          </span>
          <button disabled={isSubmitting} className='btn'>
            {/* add a spinner */}
            <span
              className={`animate-spin text-ctaColor px-4 hidden ${
                isSubmitting && 'block'
              }`}>
              <ImSpinner />
            </span>
            <p className={`${isSubmitting && 'hidden'}`}>Sign Up</p>
          </button>
        </form>
        <p className='text-sm'>
          Already have an account?
          <Link href='/auth/login' className='text-secondary underline'>
            Click here to log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
