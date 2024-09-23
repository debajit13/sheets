import { Link } from 'react-router-dom';
import HomeHeader from '../components/layout/HomeHeader';
import { MdArrowBackIos } from 'react-icons/md';

const NotFound = () => {
  return (
    <>
      <HomeHeader />
      <div className='flex flex-col items-center justify-center h-[94vh] bg-gray-100 '>
        <div className='text-center'>
          <h1 className='text-9xl font-extrabold text-gray-800'>404</h1>
          <p className='text-2xl font-semibold mt-4 text-gray-600'>
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className='mt-2 text-gray-500'>
            It looks like the page you are trying to access is not available.
          </p>
          <Link to='/'>
            <button className='mt-6 px-6 flex items-center py-3 mx-auto text-[#292929] bg-[#bcbcbc] rounded-md shadow-lg hover:bg-[#b4b4b4] transition'>
              <MdArrowBackIos /> Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default NotFound;
