import { Task } from "../../../types/types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Box, Button, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import React from "react";

type Props = {
    customers_num:number;
    suppliers_num:number;
    calkowite_koszty:number;
    calkowity_koszt_transportu: number;
    calkowity_przychod: number;
    calkowity_zysk:number;
    macierz_zyskow_jednostkowych:{[key:string]:number};
    optymalne_transporty: {[key:string]:number}
    calkowity_koszt_zakupu: number;

}

const ResultsDataTableMiddleman = ({customers_num, suppliers_num, calkowite_koszty, calkowity_koszt_transportu, calkowity_przychod, calkowity_zysk, optymalne_transporty, macierz_zyskow_jednostkowych , calkowity_koszt_zakupu}: Props) => {

    const customersTable = Array.from({length: customers_num}, (v, i) => i)
    const suppliersTable = Array.from({length: suppliers_num}, (v, i) => i)
    const suppliersDisplay = suppliersTable.map(e=>{
        return(
            <TableCell key={'Dostawca ' + (e+1)} align={"center"}>{'Dostawca ' + (e+1)}</TableCell>
        )})
    const unitMatrixDisplay = customersTable.map(customer => (
        <TableRow
            key={`Odbiorca_${customer+1}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell key={`Odbiorca_${customer}`} align="center">
                {`Odbiorca ${customer+1}`}
            </TableCell>
            {suppliersTable.map(supplier => {
                const key = `Dostawca_${supplier+1}_Odbiorca_${customer+1}`;
                const value = macierz_zyskow_jednostkowych[key];
                return (
                    <TableCell key={key} align="center">
                        {value !== undefined ? value : '-'}
                    </TableCell>
                );
            })}
        </TableRow>
    ));

    const OptimalTransports = customersTable.map(customer => (
        <TableRow
            key={`Odbiorca_${customer+1}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell key={`Odbiorca_${customer}`} align="center">
                {`Odbiorca ${customer+1}`}
            </TableCell>
            {suppliersTable.map(supplier => {
                const key = `Dostawca_${supplier+1}_Odbiorca_${customer+1}`;
                const value = optymalne_transporty[key];
                return (
                    <TableCell key={key} align="center">
                        {value !== undefined ? value : '-'}
                    </TableCell>
                );
            })}
        </TableRow>
    ));
    return (
        <Box marginBottom={5} width={800}>
            <h2>Macierz zysków jednostkowych</h2>
            <TableContainer
                component={Paper}
            >
                <Table sx={{minWidth: 650}} aria-label="simple table">
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
            <h2>Macierz optymalnych transportów</h2>
            <TableContainer
                component={Paper}
            >
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'></TableCell>
                            {suppliersDisplay}
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {OptimalTransports}
                    </TableBody>
                </Table>
            </TableContainer>
            <h2>Tabela kosztów</h2>

            <TableContainer
                component={Paper}
            >
                <Table sx={{minWidth: 650}} aria-label="simple table">

                    <TableBody>
                        <TableRow>
                            <TableCell >Koszt transportu</TableCell>
                            <TableCell align='center'>{calkowity_koszt_transportu}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Koszt zakupu</TableCell>
                            <TableCell align='center'>{calkowity_koszt_zakupu}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Koszt całkowity</TableCell>
                            <TableCell align='center'>{calkowite_koszty}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

            </TableContainer >
            <h2>Tabela zysków</h2>
            <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell >Przychód całkowity</TableCell>
                        <TableCell align='center'>{calkowity_przychod}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell  sx={{backgroundColor: '#c8e6c9'}}>Zysk pośrednika</TableCell>
                        <TableCell align='center' sx={{backgroundColor: '#c8e6c9'}}>{calkowity_zysk}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    );
};
export default ResultsDataTableMiddleman;
