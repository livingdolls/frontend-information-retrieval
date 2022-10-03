import Layout from "../../components/Layout";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button , styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import Display from "./Display";

const HeadTabel = styled(TableHead)((({theme}) => ({
    backgroundColor: '#ff6b81',
  })))
  
  const HeadCell = styled(TableCell)((({theme}) => ({
    fontSize:'18px',
    fontWeight:'bolder',
    color:'#fff'
  })))
  
  const ButtonTable = styled(Button)((({theme}) => ({
    backgroundColor: '#ff6b81',
    padding: 2,
    fontSize:'12px',
    fontWeight: 'bolder',
    color: '#fff',
    marginLeft:1,
    '&:hover': {
        backgroundColor: '#ee6b81',
      }
  })))
  
  
  const Preprocessing = ({data}) => {
    const [text, setText] = useState([])
    const [open, setOpen] = useState(false)
    
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

    return(
        <Layout>
            <Box display={'flex'} flexDirection={'column'} gap={3} sx={{backgroundColor:'#fff', padding:1, paddingLeft:5}}>
              <Box sx={{padding:'15px', backgroundColor:'#ff6b81', ml:-5, mt:-1, mr:-1}}>
                <Typography fontWeight={'bolder'} variant="h6" sx={{color:'#fff'}}>Pencarian</Typography>
              </Box>
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
                        <ButtonTable onClick={() => handleButton('casefolding', row.id)}>Delet</ButtonTable>
                    </TableCell>
                    <TableCell>
                        <ButtonTable onClick={() => handleButton('tokenisasi', row.id)}>Lihat</ButtonTable>
                    </TableCell>
                    <TableCell>
                        <ButtonTable onClick={() => handleButton('filtering', row.id)}>Lihat</ButtonTable>
                    </TableCell>
                    <TableCell>
                        <ButtonTable onClick={() => handleButton('stemming', row.id)}>Lihat</ButtonTable>
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