import { useState } from "react";
import {Step} from '../types/types'
import EntryDataTable from './components/EntryDataTable/EntryDataTable'
import { Box } from "@mui/material";
import NewDataForm from "./components/NewDataForm/NewDataForm";

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

  const addStep = (step: Step) => {
    setEntryData((prevData) => [...prevData, step])
  }

  return (
    <Box 
    className="App"
    display='flex-col'
    gap={4}
    p={2}>
      <EntryDataTable data={entryData} onClick={deleteStep}/>
      <NewDataForm steps={entryData} addData={addData}/>
    </Box>
  );
}

export default App;
