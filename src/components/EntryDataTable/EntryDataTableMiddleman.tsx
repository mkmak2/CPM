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
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
    setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
    calculate: ()=>void;
    status: boolean;
}

const EntryDataTableMiddleman = ({ customers, suppliers, setCustomers , setSuppliers, calculate, status}: Props) => {

    const dataDisplay = customers.map(e => {

        return (
            <TableRow
                key={e.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell key={e.name} align="center">{e.name}</TableCell>
                {suppliers.map(s=>{
                    return(<TableCell align={"center"}>
                            <TextField variant={"standard"} sx={{width:'30%'}} type={"number"} onChange={(f)=>handleTransportCost(f, e, s)}>
                            </TextField>
                        </TableCell>
                    )
                })}
            </TableRow>
        )})

    const suppliersDisplay = suppliers.map(e=>{
        return(
            <TableCell key={e.name} align={"center"}>{e.name}</TableCell>
    )})

    const customersDataDisplay = customers.map((e,index)=>{
        return(
            <TableRow>
                <TableCell align={"center"}>{e.name}
            </TableCell>
                <TableCell align={"center"}> <TextField variant={"standard"} sx={{width:'30%'}} type={"number"} onChange={(s)=>handleChangeCustomer(s,index, "demand")}>
                </TextField></TableCell>
                <TableCell align={"center"}> <TextField variant={"standard"} sx={{width:'30%'}} type={"number"} onChange={(s)=>handleChangeCustomer(s,index, "selling")}>
                </TextField></TableCell>
            </TableRow>
        )
    })
    const suppliersDataDisplay = suppliers.map((e,index)=>{
        return(
            <TableRow>
                <TableCell align={"center"}>{e.name}</TableCell>
                <TableCell align={"center"}><TextField variant={"standard"} sx={{width:'30%'}} type={"number"} onChange={(s)=>handleChangeSupplier(s,index, "supply")}>
                    </TextField></TableCell>
                <TableCell align={"center"}><TextField variant={"standard"} sx={{width:'30%'}} type={"number"} onChange={(s)=>handleChangeSupplier(s,index, "purchase")}>
                    </TextField></TableCell>
            </TableRow>
        )
    })

    const handleChangeCustomer = (e:any, index:number, fieldname:string)=>{
        const prev = [...customers];
        if (fieldname==="name")
            prev[index].name = e.target.value;
        else if (fieldname==="demand")
            prev[index].demand = e.target.value;
        else
            prev[index].sellingPrice = e.target.value;

        setCustomers(prev);

    }

    const handleChangeSupplier = (e:any, index:number, fieldname:string)=>{
        const prev = [...suppliers];
        if (fieldname==="name")
            prev[index].name = e.target.value;
        else if (fieldname==="supply")
            prev[index].supply = e.target.value;
        else
            prev[index].purchasePrice = e.target.value;

        setSuppliers(prev);

    }

    const handleTransportCost = (e:any, customer:Customer, supplier:Supplier) =>{
        customer.suppliers[supplier.name] = e.target.value;
    }

    const unitMatrixDisplay = customers.map(e => {

        return (
            <TableRow
                key={e.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell key={e.name} align="center">{e.name}</TableCell>
                {suppliers.map(s=>{
                    return(<TableCell align={"center"}>
                            {e.suppliers[s.name]}
                        </TableCell>
                    )
                })}
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
                            <TableCell align='center'>Nazwa odbiorcy</TableCell>
                            <TableCell align='center'>Popyt</TableCell>
                            <TableCell align='center'>Cena sprzedaży</TableCell>
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
                            <TableCell align='center'>Nazwa dostawcy</TableCell>
                            <TableCell align='center'>Podaż</TableCell>
                            <TableCell align='center'>Koszt zakupu</TableCell>
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
                            <TableCell align='center'></TableCell>
                            {suppliersDisplay}
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {dataDisplay}
                    </TableBody>
                </Table>
            </TableContainer>
            {!status?
        <Button variant={"contained"} onClick={calculate}>Oblicz macierz jednostkową</Button>:
            <Button disabled variant={"contained"} >Oblicz macierz jednostkową</Button>}

            {status?
            <TableContainer
                component={Paper}
                sx={{maxWidth: 600, maxHeight: 500, marginBottom: 2}}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'></TableCell>
                            {suppliersDisplay}
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {unitMatrixDisplay}
                    </TableBody>
                </Table>
            </TableContainer>
                : <div></div>}
        </Box>


    )
}

export default EntryDataTableMiddleman
