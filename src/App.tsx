import { useState } from "react";
import {Task} from '../types/types'
import EntryDataTable from './components/EntryDataTable/EntryDataTable'
import { Box } from "@mui/material";
import NewDataForm from "./components/NewDataForm/NewDataForm";
import {findStartActivity} from './utils/utils'

const tmpData: Task[] = [
  {
    id: 'A',
    time: 5,
    startActivity: 1,
    endActivity: 2
  },
  {
    id: 'B',
    time: 3,
    startActivity: 2,
    endActivity: 3
  },
  {
    id: 'C',
    time: 4,
    startActivity: 3,
    endActivity: 4
  },
  {
    id: 'D',
    time: 6,
    startActivity: 4,
    endActivity: 5
  }
]

function App() {

  const [entryData, setEntryData] = useState<Task[]>(tmpData)
  
  const deleteStep = (id: string) => {
    const updatedData = entryData.filter( d => d.id !== id)
    setEntryData(updatedData)
  }

  const addStep = (step: Task) => {
    setEntryData((prevData) => [...prevData, step])
  }

  return (
    <Box 
    className="App"
    display='flex-col'
    gap={4}
    p={2}>
      {findStartActivity(entryData).error}
      <EntryDataTable data={entryData} onClick={deleteStep}/>
      <NewDataForm onSubmit={addStep}/>
    </Box>
  );
}

export default App;
