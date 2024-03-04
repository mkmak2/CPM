import { useState } from "react";
import {Step} from '../types/types'
import EntryDataTable from './components/EntryDataTable/EntryDataTable'
import { Box } from "@mui/material";

const tmpData: Step[] = [
  {
    id: 'A',
    time: 5,
    connected: null
  },
  {
    id: 'B',
    time: 3,
    connected: ['A']
  },
  {
    id: 'C',
    time: 4,
    connected: ['B']
  },
  {id: 'D',
  time: 6,
  connected: ['B', 'C']  
  }
]

function App() {

  const [entryData, setEntryData] = useState<Step[]>(tmpData)
  
  const deleteStep = (id: string) => {
    const updatedData = entryData.filter( d => d.id !== id)
    setEntryData(updatedData)
  }

  return (
    <Box 
    className="App"
    display='flex'
    p={5}>
      <EntryDataTable data={entryData} onClick={deleteStep}/>
    </Box>
  );
}

export default App;
