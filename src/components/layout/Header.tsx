import { forwardRef, useState } from 'react';
import logo from '../../assets/logo.png';
import { MdCheck, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

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
      <img src={logo} className='h-[50px] w-[50px]' />
      <input
        value={fileName}
        onChange={(e) => {
          setFileName(e.target.value);
        }}
        type='text'
        className='ml-3 focus-visible:outline-0'
        placeholder='Enter the file name...'
      />
      <section className='flex'>
        <button
          onClick={() => {
            localStorage.setItem('fileName', fileName);
            toast.success('Save name successfully!');
          }}
          className='bg-[#bcbcbc] p-3 text-[#292929] flex items-center'
        >
          <MdCheck className='mr-1' />
          Save Name
        </button>
        <button
          className='text-[#bcbcbc] p-3 bg-[#292929] flex items-center'
          onClick={() => {
            localStorage.clear();
            toast.success('Save name successfully!');
            location.reload();
          }}
        >
          <MdDelete className='mr-1' />
          Delete Data
        </button>
      </section>
    </header>
  );
});

export default Header;
