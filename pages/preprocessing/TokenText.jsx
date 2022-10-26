import { Box, Paper, Typography, styled } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const HeadTabel = styled(TableHead)((({theme}) => ({
    backgroundColor: '#ff6b81',
  })))
  
  const HeadCell = styled(TableCell)((({theme}) => ({
    fontSize:'18px',
    fontWeight:'bolder',
    color:'#fff'
  })))

const TokenText = ({data}) => {
    console.log(data)
    return(
        <Box sx={{mt:3, width:'90%', marginLeft:'auto', marginRight:'auto'}}>
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <HeadTabel>
                <TableRow>
                <HeadCell align="left" size='small'>No</HeadCell>
                <HeadCell>Jurnal id</HeadCell>
                <HeadCell>Token</HeadCell>
                <HeadCell>Kode Jurnal</HeadCell>
                </TableRow>
            </HeadTabel>

            <TableBody>
                {data.map((d,index) => {
                    return (<TableRow
                        key={d.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="left" size='small'>{index}</TableCell>
                        <TableCell component="th" scope="row">
                        {d.jurnal_id}
                        </TableCell>
                        <TableCell>{d.token}</TableCell>
                        <TableCell>{d.kd_jurnal}</TableCell>
                    </TableRow>)
                })}

            </TableBody>
        </Table>
    </TableContainer>
    </Box>
    )
}

export default TokenText