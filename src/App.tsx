import { useEffect, useRef, useState } from 'react';
import { Change } from './types/types';
import Sheet from './components/Sheet';
import Header from './components/layout/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialData: string[][] = localStorage.getItem('displayData')
  ? JSON.parse(localStorage.getItem('displayData') as string)
  : [];

for (let row = 0; row < 2000; row++) {
  const rowData: string[] = [];
  for (let col = 0; col < 2000; col++) {
    rowData.push(''); // Initialize each cell as empty
  }
}

const App = () => {
  const [displayData, setDisplayData] = useState<string[][]>(initialData);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem('displayData', JSON.stringify(displayData));
  }, [displayData]);

  const onChange = (changes: Change[]) => {
    const newData = [...displayData];
    for (const change of changes) {
      if (!newData[change.y]) {
        newData[change.y] = [];
      }
      newData[change.y][change.x] = change.value;
    }
    setDisplayData(newData);
  };

  return (
    <>
      <ToastContainer />
      <div className='flex flex-col h-screen'>
        <Header ref={headerRef} />
        <Sheet
          headerRef={headerRef}
          displayData={displayData}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default App;
