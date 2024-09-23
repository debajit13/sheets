import { useEffect, useState } from 'react';
import { Change } from './types/types';
import Sheet from './components/Sheet';

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

  return <Sheet displayData={displayData} onChange={onChange} />;
};

export default App;
