import { v4 as uuidv4 } from 'uuid';
import { MdAdd } from 'react-icons/md';
import HomeHeader from '../components/layout/HomeHeader';
import SheetCard from '../components/global/SheetCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const [files, setFiles] = useState<
    | {
        id: string;
        filename: string;
        sheetData: string[][];
      }[]
    | []
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('files')) {
      localStorage.setItem('files', JSON.stringify([]));
    }

    const existingFiles = JSON.parse(localStorage.getItem('files') ?? '');
    setFiles(existingFiles);
  }, []);

  const newSheetHandler = () => {
    const id = uuidv4();
    const existingFiles = JSON.parse(localStorage.getItem('files') ?? '');
    console.log(existingFiles);

    localStorage.setItem(
      'files',
      JSON.stringify([
        ...existingFiles,
        {
          id: id,
          filename: 'New File',
          sheetData: [[]],
        },
      ])
    );
    navigate('/sheet/' + id);
  };

  return (
    <>
      <HomeHeader />
      <section className='p-3 '>
        <h2 className='text-4xl mt-8 text-center'>Welcome to Sheets</h2>
        <p className='text-gray-600 font-bold mt-3 text-center'>
          Click on the + button to create new sheet
        </p>
        <button
          onClick={newSheetHandler}
          className='mt-8 mx-auto flex w-[200px] text-[#292929] bg-[#bcbcbc] p-3 rounded-3xl font-bold items-center justify-center'
        >
          <MdAdd size='18px' />
          New Sheet
        </button>
        {files.length > 0 && (
          <section className='text-2xl font-bold mt-8 '>
            <h2>Your Exising Sheets</h2>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6'>
              {files.map((file) => (
                <SheetCard
                  href={`/sheet/${file.id}`}
                  key={file.id}
                  fileName={file.filename}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default Home;
