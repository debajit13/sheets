import { forwardRef, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { MdCheck, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const SheetHeader = forwardRef<HTMLDivElement>((_props, ref) => {
  const [fileName, setFileName] = useState<string>('');
  const params = useParams();
  const navigate = useNavigate();

  const saveFileNameHandler = () => {
    const existingFiles = JSON.parse(localStorage.getItem('files') ?? '');
    const currentFileIndex = existingFiles.findIndex(
      (file: { id: string | undefined }) => file.id === params.id
    );
    existingFiles[currentFileIndex].filename = fileName;
    localStorage.setItem('files', JSON.stringify(existingFiles));
    toast.success('Save name successfully!');
  };

  const deleteFileHandler = () => {
    const existingFiles = JSON.parse(localStorage.getItem('files') ?? '');
    const filteredFiles = existingFiles.filter(
      (file: { id: string | undefined }) => file.id !== params.id
    );
    localStorage.setItem('files', JSON.stringify(filteredFiles));
    navigate('/');
    toast.success('Successfully Deleted!');
  };

  useEffect(() => {
    const existingFiles = JSON.parse(localStorage.getItem('files') ?? '');
    const currentFile = existingFiles.find(
      (file: { id: string | undefined }) => file.id === params.id
    );
    setFileName(currentFile.filename);
  }, [params.id]);

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
          onClick={saveFileNameHandler}
          className='bg-[#bcbcbc] p-3 text-[#292929] flex items-center'
        >
          <MdCheck className='mr-1' />
          Save Name
        </button>
        <button
          className='text-[#bcbcbc] p-3 bg-[#292929] flex items-center'
          onClick={deleteFileHandler}
        >
          <MdDelete className='mr-1' />
          Delete Data
        </button>
      </section>
    </header>
  );
});

export default SheetHeader;
