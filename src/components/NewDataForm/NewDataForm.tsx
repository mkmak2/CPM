import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import ConnectedActivity from './ConnectedActivity'
import { Task } from '../../../types/types'

interface Props {
  steps: Task[],
  onSubmit: (step: Task) => void
}

const NewDataForm = ({steps, onSubmit}: Props) => {

  const [stepData, setStepData] = useState<Task>({id: '', time: 0, startActivity: 0, endActivity:0})

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setStepData((prevData) => ({...prevData, [name]: value}))
  }

  const validation = () => {
    if(stepData.id === '')
      return 0
    if(stepData.time === 0)
      return 0

    return 1;
  }

  const addActivity = (e: any) => {
    console.log("hej")
    if(validation())
    onSubmit(stepData)

  }

  return (
    <Box
    width={600}
    display='flex-col'
    mt={5}
    >
      <Box
      display='flex'
      justifyContent={'space-between'}
      width={600}>
        <TextField 
        id="standard-basic" 
        label="Nazwa czynnosci" 
        variant="standard"
        name="id"
        value={stepData.id}
        onChange={(e) => handleChange(e)}/>
        <TextField 
        id="standard-basic" 
        label="Czas trwania" 
        variant="standard" 
        name="time"
        value={stepData.time}
        onChange={(e) => handleChange(e)} 
        sx={{display: 'block'}}/>
      </Box>
      <Box
      display='flex'
      justifyContent={'space-between'}
      alignItems='center'
      width={600}
      height={50}
      mt={5}>
        {steps.length ? (
        <FormControl variant="standard" sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Zdarzenie początkowe</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            {steps.map(s => (
                <MenuItem value={s.id}>{s.id}</MenuItem>
              ))}
          </Select>

        </FormControl>
          ): ( 
            <FormControl variant="standard" sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">---</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >           
            </Select>
          </FormControl>
        )}



        <Box
        display='flex'
        gap={2}
        >
          <ConnectedActivity/>
        </Box>
      </Box>
        
      <Box
        mt={5}
      >
        <Button variant="contained" onClick={(e) => addActivity(e)}>Dodaj czynnosc </Button>
      </Box>
    </Box>
  )
}

export default NewDataForm