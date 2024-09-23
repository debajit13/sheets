import { forwardRef, useState } from 'react';
import logo from '../../assets/logo.png';

const Header = forwardRef<HTMLDivElement>((_props, ref) => {
  const [fileName, setFileName] = useState<string>(
    localStorage.getItem('fileName') ?? ''
  );

  return (
    <header
      ref={ref}
      className='flex w-full justify-between overflow-hidden'
      id='header'
    >
      <img src={logo} className='h-[40px] w-[40px]' />
      <input
        value={fileName}
        onChange={(e) => {
          setFileName(e.target.value);
        }}
        type='text'
        className='ml-3 focus-visible:outline-0'
        placeholder='Enter the file name...'
      />
      <section>
        <button
          onClick={() => {
            localStorage.setItem('fileName', fileName);
          }}
          className='bg-[#bcbcbc] p-3 text-[#292929] '
        >
          Save Name
        </button>
        <button
          className='text-[#bcbcbc] p-3 bg-[#292929]'
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
        >
          Delete Data
        </button>
      </section>
    </header>
  );
});

export default Header;
