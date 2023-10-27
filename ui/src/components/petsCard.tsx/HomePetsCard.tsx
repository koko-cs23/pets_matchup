import VerticalProductCard from './VerticalPetsCard';
import LoadingPage from '../LoadingPage';

const HomePetsCard = () => {
  return (
    <div className='pl-3 md:pl-6 w-full py-11 grid gap-x-2 gap-y-3 gtc grid-flow-row'>
      <VerticalProductCard
        productName='Eskimo Purebred 2 years male'
        location='Lekki, Lagos'
      />
      <VerticalProductCard
        productName='Eskimo Purebred 2 years male'
        location='Lekki, Lagos'
      />
      <VerticalProductCard
        productName='Eskimo Purebred 2 years male'
        location='Lekki, Lagos'
      />
      <VerticalProductCard
        productName='Eskimo Purebred 2 years male'
        location='Lekki, Lagos'
      />
      <VerticalProductCard
        productName='Eskimo Purebred 2 years male'
        location='Lekki, Lagos'
      />
      <VerticalProductCard
        productName='Eskimo Purebred 2 years male'
        location='Lekki, Lagos'
      />
    </div>
  );
};

export default HomePetsCard;
