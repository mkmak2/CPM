import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box} from '@mui/material'
import { Button } from '@mui/material';
import { Task } from '../../../types/types';

interface Props {
    data: Task[],
    onClick: (id: string, endId: number) => void,
    status: boolean
    calc: () => void
}
const EntryDataTable = ({data, onClick, status, calc}: Props) => {

    const dataDisplay = data.map(e => {

        return (
            <TableRow
                key={e.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row" align='center'>
                    {e.id}
                </TableCell>
                <TableCell align="center">{e.time}</TableCell>
                <TableCell align="center">{e.startActivity}-{e.endActivity}</TableCell>
                <TableCell align="center">
                    <Button variant="contained"
                            onClick={() => onClick(e.id, e.endActivity)}>Usun</Button>
                </TableCell>
            </TableRow>
        )})

    return (
        <Box>
            <TableContainer
                component={Paper}
                sx={{maxWidth: 600, maxHeight: 500, marginBottom: 2}}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Czynnosc</TableCell>
                            <TableCell align="center">Czas</TableCell>
                            <TableCell align="center">Następstwo<br/> zdarzeń</TableCell>
                            <TableCell align="center">Usun</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataDisplay}
                    </TableBody>
                </Table>
            </TableContainer>
            { status ?
                <Button variant="contained" onClick={() => calc()} >Wykonaj</Button>
                :
                <Button disabled variant="contained" >Wykonaj</Button>
            }
        </Box>
    )
}

export default EntryDataTable