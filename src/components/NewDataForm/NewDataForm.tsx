import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { TextField, Button } from '@mui/material'
import { Task } from '../../../types/types'

interface Props {
  onSubmit: (step: Task) => void
}

const NewDataForm = ({onSubmit}: Props) => {

  const [stepData, setStepData] = useState<Task>({id: '', time: 0, startActivity: 0, endActivity:0, EF:-1,ES:-1,LS:-1,LF:-1,R:-1})
  const [error, setError] = useState<string>('')

  const handleChange = (e: any) => {
    const {name, value} = e.target
    if(name !== 'id')
      setStepData((prevData) => ({...prevData, [name]: parseInt(value)}))
    else
      setStepData((prevData) => ({...prevData, [name]: value}))
  }

  const validation = () => {

    const isEmpty = (value: any) => value === 0 || value === '';

    if(Object.values(stepData).some(isEmpty)) {
      setError('Wypelnij wszytskie pola')
      return 0
    }

    setError('')
    return 1;
  }

  const addtask = () => {
    if(validation()){
      onSubmit(stepData)
      setStepData({id: '', time: 0, startActivity: 0, endActivity:0, EF:-1,ES:-1,LS:-1,LF:-1,R:-1})
   }
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
          data-cy='activity-name'
          id="standard-basic" 
          label="Nazwa czynnosci" 
          variant="standard"
          name="id"
          value={stepData.id}
          onChange={(e) => handleChange(e)}/>
        <TextField 
          data-cy='activity-time'
          id="standard-basic" 
          label="Czas trwania" 
          variant="standard" 
          name="time"
          value={stepData.time ? stepData.time : ''}
          onChange={(e) => handleChange(e)} 
          sx={{display: 'block'}}/>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        width={600}
        mt={2}>
        <TextField 
          data-cy='start-activity'
          id="standard-basic" 
          label="Zdarzenie poczatkowe" 
          variant="standard"
          name="startActivity"
          value={stepData.startActivity ? stepData.startActivity : ''}
          onChange={(e) => handleChange(e)}/>
        <TextField 
          data-cy='end-activity'
          id="standard-basic" 
          label="Zdarzenie koncowe" 
          variant="standard" 
          name="endActivity"
          value={stepData.endActivity ? stepData.endActivity : ''}
          onChange={(e) => handleChange(e)} 
          sx={{display: 'block'}}/>
      </Box>
        
      <Box mt={2} >
        <Button variant="contained" data-cy='add-task' onClick={(e) => addtask()}>Dodaj czynnosc </Button>
        <Box mt={2} color='red'>
          <span>{error}</span>
        </Box>
      </Box>
    </Box>
  )
}

export default NewDataForm