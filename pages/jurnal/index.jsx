import { Add } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import AlertModal from "../../components/AlertModal";
import Layout from "../../components/Layout";
import MainButton from "../../components/MainButton";
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
        <Layout judulmenu="Data Jurnal">
            <AlertModal pesan={alert.pesan} severity={alert.severity} alert={alert.alert} setAlert={alert.setAlert} />
     
            <Box minHeight={'100vh'}>
                <MainButton
                    onClick={handleOpen}
                    endIcon={<Add />}  
                    size={'large'}
                    sx={{marginBottom:-3}}
                >
                    Tambah Dokumen Jurnal
                </MainButton>

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