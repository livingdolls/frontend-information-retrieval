import { Box, Button, styled, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Refresh, Visibility } from "@mui/icons-material";
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

  
  const BuatIndex = ({data}) => {
      const [loading, setLoading] = useState(false);
      const [open, setOpen] = useState(false);
      const [kata, setKata] = useState([]);


      const handleRefresh = async () => {
        setLoading(true)

        await fetch('http://localhost/mytfidf/API/_BuatIndex.php')
        .then(res => res.json())

        setLoading(false)
    }
    
      const handleButton = async (id) => {
        setOpen(true);

        await fetch('http://localhost/mytfidf/API/_getIndexById.php?id='+id)
            .then(res => res.json())
            .then(d => setKata(d))
      }
    return(
        <Layout>
            <Box display={'flex'} flexDirection={'column'} gap={3} sx={{backgroundColor:'#fff', padding:1, paddingLeft:5}}>
              <Box sx={{padding:'15px', backgroundColor:'#ff6b81', ml:-5, mt:-1, mr:-1}}>
                <Typography fontWeight={'bolder'} variant="h6" sx={{color:'#fff'}}>Buat Index</Typography>
              </Box>

              {loading 
                ?
                <ButtonTable disabled endIcon={<Refresh />} sx={{width:"150px",ml:-4, p:1, fontSize:"14px", backgroundColor:"#eee"}}>Refresh...</ButtonTable>
                :
                <ButtonTable onClick={handleRefresh} endIcon={<Refresh />} sx={{width:"150px",ml:-4, p:1, fontSize:"14px"}}>Refresh</ButtonTable>
              }

              <Box sx={{padding:'15px', ml:-5, mt:-1, mr:-1}}>
                  <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <HeadTabel>
                            <TableRow>
                                <HeadCell align="left" size='small'>No</HeadCell>
                                <HeadCell>Judul Dokumen</HeadCell>
                                <HeadCell>Index Term Frequency</HeadCell>
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
                                    <ButtonTable onClick={() => handleButton(row.id)}><Visibility /></ButtonTable>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                </TableContainer>
            </Box>
            </Box>
            <Display open={open} setOpen={setOpen} kata={kata} />
        </Layout>
    )
}

export default BuatIndex;

export const getStaticProps = async () => {
    const res = await fetch('http://localhost/mytfidf/API/_getAllJurnal.php') 
    const data = await res.json()

    return {
        props: {
            data: data
        }
    }
}