import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import AlertModal from "../../components/AlertModal";
import Layout from "../../components/Layout";
import AddJurnal from "./AddJurnal";
import Jurnal_Info from "./Jurnal_Info";
import Jurnal_Table from "./Jurnal_Table";

const Jurnal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [selectData, setSelectData] = useState({
        id:0,
        judul:"Sistem Temu Kembali",
        pengarang:"Nanang Setiawan",
        tahun:2020,
        kd:"FTI",
        abstrak:"Hello World"
    })

    const [alert, setAlert] = useState({
        alert:false,
        pesan : '',
        severity:'success',
    })


    const getSelectData = (id,title,pengarang,tahun,abstrak,kd) => {
        setSelectData({
            id,
            judul:title,
            pengarang:pengarang,
            tahun:tahun,
            abstrak:abstrak,
            kd:kd
        })
    }

    return(
        <Layout>
        <AlertModal pesan={alert.pesan} severity={alert.severity} alert={alert.alert} setAlert={alert.setAlert} />
            <Box p={2} minHeight={'100vh'}>
                <Button
                onClick={handleOpen}
                endIcon={<Add />} variant={'contained'} size={'large'} 
                sx={{backgroundColor:'#ff6b81', '&:hover': {
                    backgroundColor: '#ee6b81',
                  }}}
                >Tambah Dokumen Jurnal</Button>

                <Grid container spacing={2} mt={2}>
                    <Grid item xs={8}>
                        <Jurnal_Table getSelectData={getSelectData} />
                    </Grid>

                    <Grid item xs={4}>
                        <Jurnal_Info selectData={selectData} />
                    </Grid>
                </Grid>

                <AddJurnal open={open} setOpen={setOpen} setAlert={setAlert} />
            </Box>
        </Layout>
    )
}

export default Jurnal;