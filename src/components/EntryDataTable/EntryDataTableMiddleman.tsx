import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Tab,Button, TextField } from '@mui/material';

interface Props {
    customersNum: number,
    suppliersNum: number
    calc: (data: resultDataObject)=> void;
}

type initialDataObject = {
    liczba_dostawcow: number,
    liczba_odbiorcow: number,
    maks_popyt: Array<number>,
    maks_podaż: Array<number>,
    koszty_zakupu: Array<number>,
    ceny_sprzedaży: Array<number>,
    koszty_transportu: Array<Array<number>>,
  }

type resultDataObject = {
    calkowite_koszty:number;
    calkowity_koszt_transportu: number;
    calkowity_przychod: number;
    calkowity_zysk:number;
    macierz_zyskow_jednostkowych:{[key:string]:number};
    optymalne_transporty: {[key:string]:number}

}

const EntryDataTableMiddleman = ({customersNum, suppliersNum, calc}: Props) => {

    const customersTable = Array.from({length: customersNum}, (v, i) => i)
    const suppliersTable = Array.from({length: suppliersNum}, (v, i) => i)

    const [data, setData] = useState<resultDataObject>()
    const [popyt, setPopyt] = useState<Array<number>>(Array(customersNum).fill(0))
    const [sprzedaz, setSprzedaz] = useState<Array<number>>(Array(customersNum).fill(0))
    const [podaz, setPodaz] = useState<Array<number>>(Array(suppliersNum).fill(0))
    const [zakup, setZakup] = useState<Array<number>>(Array(suppliersNum).fill(0))
    const [transport, setTransport] = useState<number[][]>(Array.from({ length: suppliersNum }, () => Array(customersNum).fill(0)))
    

    function createData(
        name: string,
        popyt: JSX.Element,
        cena: JSX.Element
    
      ) {
        return { name, popyt, cena };
      }

    function createTransportData(
        name: string,
        input: Array<JSX.Element>
    ) {
        return {name, input}
    }

      const updatePopyt = (e: any, index: number) => {
        const newArr = popyt ? [...popyt] : []
        newArr[index] = parseInt(e.target.value)
        setPopyt(newArr)
      }

      const updateSprzedaz = (e: any, index: number) => {
        const newArr = sprzedaz ? [...sprzedaz] : []
        newArr[index] = parseInt(e.target.value)
        setSprzedaz(newArr)
      }

      const updatePodaz = (e: any, index: number) => {
        const newArr = podaz ? [...podaz] : []
        newArr[index] = parseInt(e.target.value)
        setPodaz(newArr)
      }

      const updateZakup = (e: any, index: number) => {
        const newArr = zakup ? [...zakup] : []
        newArr[index] = parseInt(e.target.value)
        setZakup(newArr)
      }

      const updateTransport = (e: any, index1: number, index2: number) => {
            const newArr = transport ? [...transport] : [[]]
            const newRow = newArr[index1]
            newRow[index2] = parseInt(e.target.value)
            newArr[index1] = newRow
            setTransport(newArr)

      }

      

      const firstTableRows = customersTable.map( c => (
        createData(
            `Odbiorca ${c + 1}`,
            <TextField id="standard-basic" variant="standard" value={popyt[c]}
            onChange={(e) => updatePopyt(e, c) } />,
            <TextField id="standard-basic" variant="standard" value={sprzedaz[c]}
                onChange={(e) => updateSprzedaz(e,c)} />)
      ))

      const secondTableRows = suppliersTable.map( c => (
        createData(
            `Dostawca ${c + 1}`,
            <TextField id="standard-basic" variant="standard" value={podaz[c]}
            onChange={(e) => updatePodaz(e, c) } />,
            <TextField id="standard-basic" variant="standard" value={zakup[c]}
                onChange={(e) => updateZakup(e,c)} />)
      ))
      
      const thirdTableRows = customersTable.map( c => (
        createTransportData(
            `Odbiorca ${c + 1}`,
            suppliersTable.map( s => (
                <TextField id="standard-basic" variant="standard" value={transport[s][c]}
                onChange={(e) => updateTransport(e,s,c)} />
           ))
      )))

      console.log(transport)

      const onSubmit = async () => {
        const newData = {
            liczba_dostawcow: suppliersNum,
            liczba_odbiorcow: customersNum,
            maks_popyt: popyt,
            maks_podaż: podaz,
            koszty_zakupu: zakup,
            ceny_sprzedaży: sprzedaz,
            koszty_transportu: transport,
        }

        console.log(newData)

        const res = await fetch('http://localhost:5000/send_data', {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        console.log(res)

          if(res.status==200)
          {
              const res2 = await fetch('http://localhost:5000/get_results', {
                  method: 'GET',
                  headers:{
                      'Content-Type': 'application/json'
                  },

              })
              const result= await res2.json();
              setData(result)
              calc(result);
          }

      }

  return (
    <div>
        <Box marginBottom={5} width={800}>
            <h2>Dane odbiorców</h2>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Nazwa Odbiorcy</TableCell>
                    <TableCell align="center">Popyt</TableCell>
                    <TableCell align="center">Cena sprzedazy</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {firstTableRows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="center">{row.popyt}</TableCell>
                    <TableCell align="center">{row.cena}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>

        <Box marginBottom={5} width={800}>
            <h2>Dane dostawców</h2>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa Dostawcy</TableCell>
                            <TableCell align="right">Podaz</TableCell>
                            <TableCell align="right">Koszt zakupu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {secondTableRows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.popyt}</TableCell>
                                <TableCell align="right">{row.cena}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

        <Box marginBottom={5} width={800}>
            <h2>Koszty transportu</h2>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {suppliersTable.map(s => (
                                <TableCell align="center">Dostawca {s + 1}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {thirdTableRows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                {row.input.map(i => (
                                    <TableCell>{i}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

        <Button variant="contained" onClick={() => onSubmit()}>Wykonaj</Button>
 
    </div>
  )
}

export default EntryDataTableMiddleman