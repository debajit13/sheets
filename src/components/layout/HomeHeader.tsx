import logo from '../../assets/logo.png';

const HomeHeader = () => {
  return (
    <header className='flex items-center bg-[#bcbcbc]'>
      <img src={logo} alt='logo' height='50px' width='50px' />
      <h1 className='font-bold text-[20px] ml-2 text-[#292929]'>Sheets</h1>
    </header>
  );
};
export default HomeHeader;
