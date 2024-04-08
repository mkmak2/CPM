import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {Box} from "@mui/material";
import {Customer, Supplier} from "../../../types/types";

interface Props {
    customers: Customer[];
    suppliers: Supplier[];
}



const EntryDataTableMiddleman = ({ customers, suppliers }: Props) => {

    return (
        <Box>

        </Box>
    );
}

export default EntryDataTableMiddleman
