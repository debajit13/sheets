import { useState } from 'react';
import { Change } from './types/types';
import Sheet from './components/Sheet';

const initialData: string[][] = [];

const App = () => {
  const [displayData, setDisplayData] = useState<string[][]>(initialData);

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
