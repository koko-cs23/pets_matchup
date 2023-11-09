// export const apiAddress = 'http://localhost:3000/';
export const apiAddress =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://petsmatchup.vercel.app';
