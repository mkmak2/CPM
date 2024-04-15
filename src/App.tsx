import React, {useEffect, useRef, useState} from "react";
import {Activity, Customer, Supplier, Task} from '../types/types'
import EntryDataTable from './components/EntryDataTable/EntryDataTable'
import {Box, Button, TextField} from "@mui/material";
import NewDataForm from "./components/NewDataForm/NewDataForm";
import {
  calculateCritical,
  calculateLF,
  calculateLS,
  calculateTaskEF,
  calculateTaskES,
  calculateTaskR, calculateTasks,
  findStartActivity, graph,
  isDuplicate,
  setEdgesActivities
} from './utils/utils'
import ResultsDataTable from "./components/ResultsDataTable/ResultsDataTable";
import ReactDOM from "react-dom/client";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import EntryDataTableMiddleman from "./components/EntryDataTable/EntryDataTableMiddleman";
import {calculateUnitMatrix} from "./utils/middlemanUtils";
function App() {

  const [entryData, setEntryData] = useState<Task[]>()
  const [activity, setActivity] = useState<Activity[]>()
  const [showTable, setShowTable] = useState<boolean>(false)
  const [chooseMethod, setChooseMethod] = useState<string>("0")
  const [customersNum, setCustomersNum] = useState<number>(0);
  const [suppliersNum, setSuppliersNum] = useState<number>(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showTablesMiddleman, setShowTablesMiddleman] = useState<boolean>(false);
  const [showUnitMatrix, setShowUnitMatrix] = useState<boolean>(false);

  const deleteStep = (id: string, endId: number) => {
    const updatedData = entryData!.filter(d => d.id !== id)
    if (entryData?.length === 1)
      setActivity([])
    else {
      const tmp = entryData!.filter(d => d.endActivity === endId)
      if (tmp.length === 1) {
        let updatedActivity = activity!.filter(a => a.id !== endId)
        updatedActivity.forEach(a => a.connected = a.connected.filter(c => c.id !== id))
        updatedActivity.forEach(a => a.nextTasks= a.nextTasks.filter(c => c.id !== id))
        updatedActivity = updateActivities(updatedActivity, null, updatedData)

        setActivity(updatedActivity)
      } else {
        let updatedActivity = activity!
        updatedActivity.forEach(a => a.connected = a.connected.filter(c => c.id !== id))
        updatedActivity.forEach(a => a.nextTasks= a.nextTasks.filter(c => c.id !== id))
        updatedActivity = updateActivities(updatedActivity, null, updatedData)

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
        const tasks = [...entryData, step]
        setEntryData(tasks)
        addActivity(step.startActivity, step.endActivity, step, tasks)
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
          isStart: true,
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
          isEnd: true,
          isCritical: false,
        }
      ]
      setActivity(initialActivities)
      setEntryData([step])
    }

  }

  const updateActivities = (activities: Activity[], newActivity: Activity | null, tasks: Task[]): Activity[]  => {
    let updatedActivities = newActivity ? [...activities, newActivity] : [...activities]
    updatedActivities = setEdgesActivities(updatedActivities, tasks)

    return updatedActivities
  }

  const addActivity = (startId: number, endId: number, task: Task, tasks: Task[]) => {
    if (!activity?.filter(a => a.id === startId).length) {
      const newActivity = {
        id: startId,
        ES: 0,
        EF: 0,
        R: 0,
        connected: [],
        nextTasks: [task],
        isStart: false,
        isEnd: false,
        isCritical: false,
      }
      let activitiesTmp = activity
      activitiesTmp = updateActivities(activitiesTmp!, newActivity, tasks)
      setActivity(activitiesTmp)
    }
    if (!activity?.filter(a => a.id === endId).length) {
      const tmp = [...activity!];
      const ind = tmp.findIndex(i => i.id === startId)
      const next = tmp[ind].nextTasks
      if (!next.length)
        tmp[ind].nextTasks = [task];
      else
        tmp[ind].nextTasks = [...next, task];
      const newActivity = {
        id: endId,
        ES: 0,
        EF: 0,
        R: 0,
        connected: [task],
        nextTasks: [],
        isStart: false,
        isEnd: false,
        isCritical: false,
      }
      const updatedActivities = updateActivities(tmp, newActivity, tasks)
      setActivity(updatedActivities)
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

      const updatedActivities = updateActivities(tmp, null, tasks)  
      setActivity(updatedActivities);

    }
  }


  const calc = () => {
    const updatedAtivity = calculateCritical(activity!);
    setActivity(updatedAtivity);

    setEntryData(calculateTasks(updatedAtivity,entryData!));

    setShowTable(true);

    const cy = graph(activity!, entryData!);

  }

  const handleMethodChange = ()=>{
    const prevValue = chooseMethod;
    if (prevValue === "0")
      setChooseMethod("1");
    else
      setChooseMethod("0");
  }

  const handleCustomersNum = (e:any) =>{
    setCustomersNum(e.target.value);
  }
  const handleSuppliersNum = (e:any) =>{
    setSuppliersNum(e.target.value);
  }

  const handleOnClick = () => {

    for(let i=0; i<customersNum;i++)
    {
      let customer:Customer = {
        name:"Odbiorca" + " " + (i+1),
        demand:0,
        sellingPrice:0,
        suppliers:{}
      }
      customers.push(customer);
    }
    for(let i=0; i<suppliersNum;i++)
    {

      let supplier:Supplier = {
        name:"Dostawca" + " " + (i+1),
        supply:0,
        purchasePrice:0
      }

      suppliers.push(supplier);
    }

    for(let i=0; i<customersNum;i++)
    {
      for(let j=0; j<suppliersNum;j++)
      {
        customers[i].suppliers[suppliers[j].name] = 0;
      }
    }

    setShowTablesMiddleman(true);
  }

  const calculate = () => {
      calculateUnitMatrix(customers, suppliers);
      setShowUnitMatrix(true);
      console.log(customers);
  }



  const status = entryData ? findStartActivity(entryData) : false
  return (

      <TabContext value={chooseMethod}>
        <Box>
            <Tabs value={chooseMethod} onChange={handleMethodChange}>
              <Tab label={"CPM"}  value={"0"}></Tab>
              <Tab label={"Metoda pośrednika"} value={"1"}></Tab>
            </Tabs>
        </Box>

        <TabPanel value={"0"}>
          <Box
              className="App"
              display='flex'
              gap={4}
              p={2}
              width={'100%'}
          >
            <Box width={"50%"}>
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

              {showTable && <ResultsDataTable data={entryData!}></ResultsDataTable>}
            </Box>
            <Box width={"50%"}>
              <div id={"cy"} style={{width:"100%", height: "1000px"}}></div>
            </Box>
          </Box>
          </TabPanel>

          <TabPanel value={"1"}>
            <Box gap={4} p={2} display={'flex'} >
            <TextField

                label="Liczba dostawców"
                type="number"
                variant="standard"

                onChange={(e)=>handleSuppliersNum(e)}
            />

            <TextField

                label="Liczba odbiorców"
                type="number"
                variant="standard"
                onChange={(e)=>handleCustomersNum(e)}
            />

            </Box>

            <Button variant={"contained"} onClick={handleOnClick}>Potwierdź</Button>
            {showTablesMiddleman ?
            <EntryDataTableMiddleman customers={customers!} suppliers={suppliers!} setCustomers={setCustomers} setSuppliers={setSuppliers} calculate={calculate} status={showUnitMatrix}></EntryDataTableMiddleman>
                : <div></div>}
          </TabPanel>
      </TabContext>


  );
}

  export default App;
