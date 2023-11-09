import NavBar from '@/components/nav/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:
    'Pets Matchup - Connecting Your Furry Friends with Their Perfect Match',
  description:
    'Discover the ideal companions for your beloved pets with Pets Matchup. Our platform makes it easy for pet owners to connect, chat, and arrange playdates or potential matches for their furry companions. Find the perfect playmates or even a lifelong partner for your pets today',
  metadataBase: new URL('https://petsmatchup.vercel.app/')
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-primaryBg text-primaryText'>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
