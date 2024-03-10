import React, { useState } from "react";
import {Activity, Task} from '../types/types'
import EntryDataTable from './components/EntryDataTable/EntryDataTable'
import {Box, Button} from "@mui/material";
import NewDataForm from "./components/NewDataForm/NewDataForm";
import {calculateES, findStartActivity, isDuplicate} from './utils/utils'

// const tmpData: Task[] = [
//   {
//     id: 'A',
//     time: 5,
//     startActivity: 1,
//     endActivity: 2
//   },
//   {
//     id: 'B',
//     time: 3,
//     startActivity: 2,
//     endActivity: 3
//   },
//   {
//     id: 'C',
//     time: 4,
//     startActivity: 3,
//     endActivity: 4
//   },
//   {
//     id: 'D',
//     time: 6,
//     startActivity: 4,
//     endActivity: 5
//   }
// ]

function App() {

  const [entryData, setEntryData] = useState<Task[]>()
  const [activity, setActivity] = useState<Activity[]>()
  
  const deleteStep = (id: string) => {
    const updatedData = entryData!.filter( d => d.id !== id)
    setEntryData(updatedData)
  }

  const addStep = (step: Task) => {
    if(entryData){
      if(isDuplicate(entryData!,step))
        return;
      else {
        setEntryData((prevData) => [...prevData!, step])
        addActivity(step.startActivity, step.endActivity, step)
      }
    }else {
      const initialActivities = [
        {
          id: step.startActivity,
          ES: 0,
          EF: 0,
          R:0,
          connected: []
        },
        {
          id: step.endActivity,
          ES: 0,
          EF: 0,
          R: 0,
          connected: [step]
        }
      ]
      setActivity(initialActivities)
      setEntryData([step])
    }

 
  }

  const addActivity = (startId: number, endId: number, task: Task) => {
    if(!activity?.filter(a => a.id === startId).length){
      setActivity((prev) => [...prev!, {
        id: startId,
        ES: 0,
        EF: 0,
        R: 0,
        connected: []
      }])
    }
    if(!activity?.filter(a => a.id === endId).length) {
      setActivity((prev) => [...prev!, {
        id: endId,
        ES: 0,
        EF: 0,
        R: 0,
        connected: [task]
      }])
    } else {
      const tmp = [...activity]
      const index = tmp.findIndex(i => i.id === endId)
      const con = tmp[index].connected
      tmp[index].connected = [...con, task]
      setActivity(tmp)
    }
  }
  const calc = ()=>{
    const dupa = calculateES(activity!);
    setActivity(dupa);
  }
  console.log(activity)
  return (
    <Box 
    className="App"
    display='flex-col'
    gap={4}
    p={2}>
        <Box color='red' mb={2}>
          <span>
            {entryData && findStartActivity(entryData).error}
          </span>
        </Box>
      {entryData && <EntryDataTable data={entryData} onClick={deleteStep}/>}
      <NewDataForm onSubmit={addStep}/>
      <Button variant="contained" onClick={()=>calc()}>Dodaj czynnosc </Button>
    </Box>
  );
}

export default App;
