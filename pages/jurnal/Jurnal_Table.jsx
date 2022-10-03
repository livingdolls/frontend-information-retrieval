import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Delete, Visibility } from '@mui/icons-material';


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

const Jurnal_Table = ({getSelectData}) => {
  const [jurnal, setJurnal] = useState([]);

  useEffect(() => {
    getJurnal();
  },[jurnal])

  const getJurnal = async () => {
    await fetch('http://localhost/mytfidf/API/_getAllJurnal.php')
    .then(res => res.json())
    .then(data => setJurnal(data))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <HeadTabel>
          <TableRow>
            <HeadCell align="left" size='small'>No</HeadCell>
            <HeadCell>Judul Dokumen</HeadCell>
            <HeadCell>Kode Dokumen</HeadCell>
            <HeadCell>Tahun Terbit</HeadCell>
            <HeadCell>Aksi</HeadCell>
          </TableRow>
        </HeadTabel>
        <TableBody>
          {jurnal.map((row, index) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" size='small'>{index}</TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.kd_jurnal}</TableCell>
              <TableCell>2020</TableCell>
              <TableCell>
                <ButtonTable onClick={() => getSelectData(row.id,row.title,row.pengarang,row.tahun_terbit,row.abstrak,row.kd_jurnal)}><Visibility /></ButtonTable>
                <ButtonTable><Delete /></ButtonTable>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Jurnal_Table;