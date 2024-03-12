import { Task } from "../../../types/types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Box, Button } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import React from "react";

interface Props {
    data: Task[];
}

const ResultsDataTable = ({ data }: Props) => {
    const dataDisplay = data.map((e) => (
        <TableRow
            key={e.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 },
            backgroundColor: e.R === 0? "#c8e6c9" : "inherit",
            }}
        >
            <TableCell component="th" scope="row" align="center">
                {e.id}
            </TableCell>
            <TableCell align="center">{e.time}</TableCell>
            <TableCell align="center">{e.ES}</TableCell>
            <TableCell align="center">{e.EF}</TableCell>
            <TableCell align="center">{e.LS}</TableCell>
            <TableCell align="center">{e.LF}</TableCell>
            <TableCell align="center">{e.R}</TableCell>
            <TableCell align="center">{e.R ? "Nie" : "Tak"}</TableCell>

            <TableCell align="center"></TableCell>
        </TableRow>
    ));

    return (
        <Box>
            <TableContainer
                component={Paper}
                sx={{ maxWidth: 600, maxHeight: 500, marginBottom: 2 }}
            >
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Czynnosc</TableCell>
                            <TableCell align="center">Czas</TableCell>
                            <TableCell align="center">ES</TableCell>
                            <TableCell align="center">EF</TableCell>
                            <TableCell align="center">LS</TableCell>
                            <TableCell align="center">LF</TableCell>
                            <TableCell align="center">R</TableCell>
                            <TableCell align="center">Czynność <br></br> krytyczna</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{dataDisplay}</TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ResultsDataTable;
