import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-secondaryBg px-3 py-11 text-primaryText text-sm md:px-14 lg:px-32'>
      <div className='flex justify-between flex-col md:flex-row'>
        <span className='py-2'>
          <div>
            <h4 className='text-base uppercase text-ctaColor'>Sitemap</h4>
            <Link href={'#'}>
              <p>Our Blog</p>
            </Link>
            <Link href={'#'}>
              <p>Countries</p>
            </Link>
            <Link href={'#'}>
              <p>Dashboard</p>
            </Link>
            <Link href={'#'}>
              <p>Pets For Sale</p>
            </Link>
            <Link href={'#'}>
              <p>Community</p>
            </Link>
          </div>
        </span>
        <span className='py-2'>
          <div>
            <h4 className='text-base text-ctaColor'>ABOUT US</h4>
            <Link href={'/about'}>
              <p>About Us</p>
            </Link>
            <Link href={'#'}>
              <p>Disclaimer</p>
            </Link>
            <Link href={'/about'}>
              <p>Terms & conditions</p>
            </Link>
            <Link href={'/about'}>
              <p>FAQ</p>
            </Link>
          </div>
        </span>
        <span className='py-2'>
          <div>
            <h4 className='text-base text-ctaColor'>CUSTOMERS SERVICES</h4>
            <Link href={'#'}>
              <p>Customer Relations</p>
            </Link>
            <Link href={'#'}>
              <p>Anti-Scam</p>
            </Link>
            <Link href={'#'}>
              <p>Report a User</p>
            </Link>
            {/* <p>Transaction Dispute</p> */}
          </div>
        </span>
      </div>
      <div className='flex justify-between flex-col md:text-center mt-2'>
        <p>&copy; 2023 PetsMatchUp, Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
