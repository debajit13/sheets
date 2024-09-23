import { useEffect, useRef, useState } from 'react';
import Header from '../components/layout/SheetHeader';
import Sheet from '../components/Sheet';
import { Change } from '../types/types';
import { useParams } from 'react-router-dom';

const initialData: string[][] = [];

for (let row = 0; row < 2000; row++) {
  const rowData: string[] = [];
  for (let col = 0; col < 2000; col++) {
    rowData.push(''); // Initialize each cell as empty
  }
}

const SheetPage = () => {
  const [displayData, setDisplayData] = useState<string[][]>(initialData);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();

  useEffect(() => {
    const existingItems = JSON.parse(localStorage.getItem('files') ?? '');
    const currentItemIndex = existingItems.findIndex(
      (item: { id: string | undefined }) => item.id === params.id
    );

    if (existingItems[currentItemIndex]) {
      setDisplayData(existingItems[currentItemIndex].sheetData);
      console.log(existingItems);
    }
  }, [params.id]);

  const onChange = (changes: Change[]) => {
    const newData = [...displayData];
    for (const change of changes) {
      if (!newData[change.y]) {
        newData[change.y] = [];
      }
      newData[change.y][change.x] = change.value;
    }
    setDisplayData(newData);
    const existingFiles = JSON.parse(localStorage.getItem('files') ?? '');
    const currentFileIndex = existingFiles.findIndex(
      (file: { id: string | undefined }) => file.id === params.id
    );
    existingFiles[currentFileIndex].sheetData = newData;
    localStorage.setItem('files', JSON.stringify(existingFiles));
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header ref={headerRef} />
      <Sheet
        headerRef={headerRef}
        displayData={displayData}
        onChange={onChange}
      />
    </div>
  );
};

export default SheetPage;
