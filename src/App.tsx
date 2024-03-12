import React, { useState } from "react";
import {Activity, Task} from '../types/types'
import EntryDataTable from './components/EntryDataTable/EntryDataTable'
import {Box, Button} from "@mui/material";
import NewDataForm from "./components/NewDataForm/NewDataForm";
import {calculateEF, calculateES, findStartActivity, isDuplicate} from './utils/utils'

function App() {

  const [entryData, setEntryData] = useState<Task[]>()
  const [activity, setActivity] = useState<Activity[]>()

  const deleteStep = (id: string, endId: number) => {
    const updatedData = entryData!.filter(d => d.id !== id)
    if (entryData?.length === 1)
      setActivity([])
    else {
      const tmp = entryData!.filter(d => d.endActivity === endId)
      if (tmp.length === 1) {
        const updatedActivity = activity!.filter(a => a.id !== endId)
        updatedActivity.forEach(a => a.connected = a.connected.filter(c => c.id !== id))
        updatedActivity.forEach(a => a.nextTasks= a.nextTasks.filter(c => c.id !== id))

        setActivity(updatedActivity)
      } else {
        const updatedActivity = activity!
        updatedActivity.forEach(a => a.connected = a.connected.filter(c => c.id !== id))
        updatedActivity.forEach(a => a.nextTasks= a.nextTasks.filter(c => c.id !== id))

        setActivity(updatedActivity)
      }
    }
    setEntryData(updatedData)
  }

  const addStep = (step: Task) => {
    if (entryData) {
      if (isDuplicate(entryData!, step))
        return;
      else {
        setEntryData((prevData) => [...prevData!, step])
        addActivity(step.startActivity, step.endActivity, step)
      }
    } else {
      const initialActivities = [
        {
          id: step.startActivity,
          ES: 0,
          EF: 0,
          R: 0,
          connected: [],
          nextTasks: [step],
          isStart: false,
          isEnd: false,
          isCritical: false,
        },
        {
          id: step.endActivity,
          ES: 0,
          EF: 0,
          R: 0,
          connected: [step],
          nextTasks: [],
          isStart: false,
          isEnd: false,
          isCritical: false,
        }
      ]
      setActivity(initialActivities)
      setEntryData([step])
    }

  }

  const addActivity = (startId: number, endId: number, task: Task) => {
    if (!activity?.filter(a => a.id === startId).length) {
      setActivity((prev) => [...prev!, {
        id: startId,
        ES: 0,
        EF: 0,
        R: 0,
        connected: [],
        nextTasks: [task],
        isStart: false,
        isEnd: false,
        isCritical: false,
      }])
    }
    if (!activity?.filter(a => a.id === endId).length) {
      const tmp = [...activity!];
      const ind = tmp.findIndex(i => i.id === startId)
      const next = tmp[ind].nextTasks
      if (!next.length)
        tmp[ind].nextTasks = [task];
      else
        tmp[ind].nextTasks = [...next, task];
      setActivity(([...tmp!, {
        id: endId,
        ES: 0,
        EF: 0,
        R: 0,
        connected: [task],
        nextTasks: [],
        isStart: false,
        isEnd: false,
        isCritical: false,
      }]))
    } else {
      const tmp = [...activity]
      const index = tmp.findIndex(i => i.id === endId)
      const con = tmp[index].connected
      tmp[index].connected = [...con, task]

      const ind = tmp.findIndex(i => i.id === startId)
      const next = tmp[ind].nextTasks
      if (!next.length)
        tmp[ind].nextTasks = [task];
      else
        tmp[ind].nextTasks = [...next, task];

      setActivity(tmp);

    }
  }


  const calc = () => {
    const updatedAtivity = calculateEF(calculateES(activity!));
    setActivity(updatedAtivity);
  }
  
  console.log(activity)
  const status = entryData ? findStartActivity(entryData) : false
  return (
      <Box
          className="App"
          display='flex-col'
          gap={4}
          p={2}>
        <NewDataForm onSubmit={addStep}/>
        {entryData &&
            <EntryDataTable
                data={entryData}
                status={status ? status.status : status}
                onClick={deleteStep}
                calc={calc}/>}
        <Box color='red' mb={2}>
          <span>
            {entryData && findStartActivity(entryData).error}
          </span>
        </Box>
      </Box>
  );
}
  export default App;
