import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Delete, Visibility } from '@mui/icons-material';
import MainTabel from '../../components/Tabel/MainTabel';
import TabelHead from '../../components/Tabel/TabelHead';
import HeadCell from '../../components/Tabel/HeadCell';


const Jurnal_Table = ({getSelectData}) => {
  const [jurnal, setJurnal] = useState([]);

  useEffect(() => {
    getJurnal();
  },[])

  const getJurnal = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/API/_getAllJurnal.php`)
    .then(res => res.json())
    .then(data => setJurnal(data))
  }


  return (
    <MainTabel>
        <TabelHead>
          <TableRow>
            <HeadCell align="left">No</HeadCell>
            <HeadCell>Judul Dokumen</HeadCell>
            <HeadCell>Kode Dokumen</HeadCell>
            <HeadCell>Tahun Terbit</HeadCell>
            <HeadCell>Aksi</HeadCell>
          </TableRow>
        </TabelHead>
        <TableBody>
          {jurnal.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align="left">{ index }</TableCell>
              <TableCell component="th" scope="row">{ row.title }</TableCell>
              <TableCell>{ row.kd_jurnal }</TableCell>
              <TableCell>{ row.tahun_terbit }</TableCell>
              <TableCell>
                <Box display={'flex'} flexDirection={'row'}>
                  <Visibility onClick={() => getSelectData(row.id,row.title,row.pengarang,row.tahun_terbit,row.abstrak,row.kd_jurnal) }/>
                  <Delete />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </MainTabel>
  );
}

export default Jurnal_Table;