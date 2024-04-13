import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {Box, Button} from "@mui/material";
import {Customer, Supplier} from "../../../types/types";

interface Props {
    customers: Customer[];
    suppliers: Supplier[];
}



const EntryDataTableMiddleman = ({ customers, suppliers }: Props) => {

    const dataDisplay = customers.map(e => {

        return (
            <TableRow
                key={e.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{e.name}</TableCell>
                {suppliers.map(s=>{
                    return(<TableCell align={"center"}>
                            <TextField variant={"standard"} sx={{width:'30%'}} type={"number"}>
                            </TextField>
                        </TableCell>
                    )
                })}
            </TableRow>
        )})

    const suppliersDisplay = suppliers.map(e=>{
        return(
            <TableCell align={"center"}>{e.name}</TableCell>
    )})

    const customersDataDisplay = customers.map(e=>{
        return(
            <TableRow>
                <TableCell align={"center"}><TextField variant={"standard"} sx={{width:'50%'}}>
                </TextField></TableCell>
                <TableCell align={"center"}> <TextField variant={"standard"} sx={{width:'30%'}} type={"number"}>
                </TextField></TableCell>
                <TableCell align={"center"}> <TextField variant={"standard"} sx={{width:'30%'}} type={"number"}>
                </TextField></TableCell>
            </TableRow>
        )
    })
    const suppliersDataDisplay = suppliers.map(e=>{
        return(
            <TableRow>
                <TableCell align={"center"}>
                    <TextField variant={"standard"} sx={{width:'50%'}}>
                    </TextField>
                </TableCell>
                <TableCell align={"center"}>
                    <TextField variant={"standard"} sx={{width:'30%'}} type={"number"}>
                    </TextField>
                </TableCell>
                <TableCell align={"center"}>
                    <TextField variant={"standard"} sx={{width:'30%'}} type={"number"}>
                    </TextField>
                </TableCell>
            </TableRow>
        )
    })
    return (
        <Box>

            <TableContainer
                component={Paper}
                sx={{maxWidth: 600, maxHeight: 500, marginBottom: 2}}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Nazwa dostawcy</TableCell>
                            <TableCell align='center'>Podaż</TableCell>
                            <TableCell align='center'>Koszt zakupu</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {customersDataDisplay}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer
                component={Paper}
                sx={{maxWidth: 600, maxHeight: 500, marginBottom: 2}}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Nazwa odbiorcy</TableCell>
                            <TableCell align='center'>Popyt</TableCell>
                            <TableCell align='center'>Cena sprzedaży</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {suppliersDataDisplay}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer
                component={Paper}
                sx={{maxWidth: 600, maxHeight: 500, marginBottom: 2}}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Nazwa dostawcy</TableCell>
                            {suppliersDisplay}
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {dataDisplay}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>


    )
}

export default EntryDataTableMiddleman
