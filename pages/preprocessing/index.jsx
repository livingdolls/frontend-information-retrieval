import Layout from "../../components/Layout";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button , styled, Typography } from "@mui/material";
import { useState } from "react";
import Display from "./Display";
import { Refresh, Visibility } from "@mui/icons-material";
import MainButton from "../../components/MainButton";

const HeadTabel = styled(TableHead)((({theme}) => ({
    backgroundColor: '#ff6b81',
  })))
  
  const HeadCell = styled(TableCell)((({theme}) => ({
    fontSize:'18px',
    fontWeight:'bolder',
    color:'#fff'
  })))
  
  
  const Preprocessing = ({data}) => {
    const [text, setText] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleButton = async (kunci, id) => {
        setOpen(true)

        if(kunci === 'casefolding'){
            await fetch('http://localhost/mytfidf/API/_getCasefolding.php?id='+id)
            .then(res => res.json())
            .then(d => setText(d))
            
            return ""
        }

        if(kunci === 'tokenisasi'){
            await fetch('http://localhost/mytfidf/API/_getTokenisasi.php?id='+id)
            .then(res => res.json())
            .then(d => setText(d))
            
            return ""
        }

        if(kunci === 'filtering'){
            await fetch('http://localhost/mytfidf/API/_getFiltering.php?id='+id)
            .then(res => res.json())
            .then(d => setText(d))
            
            return ""
        }

        if(kunci === 'stemming'){
            await fetch('http://localhost/mytfidf/API/_getStemming.php?id='+id)
            .then(res => res.json())
            .then(d => setText(d))
            return ""
        }
    }

    const handleRefresh = async () => {
        setLoading(true)

        await fetch('http://localhost/mytfidf/_textPreprocessing.php')
        .then(res => res.json())

        setLoading(false)
    }

    return(
        <Layout judulmenu = {"Text Preprocessing"}>
              {loading 
                ?
                <MainButton disabled endIcon={<Refresh />} sx={{width:"150px",ml:-4, p:1, fontSize:"14px", backgroundColor:"#eee"}}>Refresh...</MainButton>
                :
                <MainButton onClick={handleRefresh} endIcon={<Refresh />} sx={{width:"150px",ml:-4, p:1, fontSize:"14px"}}>Refresh</MainButton>
              }

                
                <Box sx={{marginLeft:-4}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <HeadTabel>
                            <TableRow>
                                <HeadCell align="left" size='small'>No</HeadCell>
                                <HeadCell>Judul Dokumen</HeadCell>
                                <HeadCell>Case Folding</HeadCell>
                                <HeadCell>Tokenisasi</HeadCell>
                                <HeadCell>Filtering</HeadCell>
                                <HeadCell>Stemming</HeadCell>
                            </TableRow>
                            </HeadTabel>
                            <TableBody>
                            {data.map((row, index) => (
                                <TableRow
                                key={row.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="left" size='small'>{index}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell>
                                    <MainButton onClick={() => handleButton('casefolding', row.id)}><Visibility /></MainButton>
                                </TableCell>
                                <TableCell>
                                    <MainButton onClick={() => handleButton('tokenisasi', row.id)}><Visibility /></MainButton>
                                </TableCell>
                                <TableCell>
                                    <MainButton onClick={() => handleButton('filtering', row.id)}><Visibility /></MainButton>
                                </TableCell>
                                <TableCell>
                                    <MainButton onClick={() => handleButton('stemming', row.id)}><Visibility /></MainButton>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                </TableContainer>
            </Box>

        <Display data={text} open={open} setOpen={setOpen} />
        </Layout>
    )
}

export default Preprocessing;

export const getStaticProps = async () => {
    const res = await fetch('http://localhost/mytfidf/API/_getAllJurnal.php') 
    const data = await res.json()

    return {
        props: {
            data: data
        }
    }
}