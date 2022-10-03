import { Box, Divider, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Layout from "../../components/Layout";

const jurnalDetail = (props) => {
    const {data} = props.data;
    return (
        <Layout>
            <Box  display={'flex'} flexDirection={'column'} gap={3} sx={{backgroundColor:"#fff", padding:1, paddingLeft:5}}>
                <Box sx={{padding:'15px', backgroundColor:'#ff6b81', ml:-5, mt:-1, mr:-1}}>
                    <Typography fontWeight={'bolder'} variant="h6" sx={{color:'#fff'}}>{data.title}</Typography>
                </Box>
            
                <Paper elevation={3} sx={{width:'70%',p:5}}>
                    <Typography variant={'button'} >{data.pengarang}</Typography>
                    <Divider />
                    <Typography variant={'h6'} fontWeight={'bolder'} align={'center'} sx={{mt:2}}>ABSTRAK</Typography>
                    <Typography variant={'body'} align={'justify'} sx={{fontSize:'20px'}}>{data.abstrak}</Typography>

                    <Divider sx={{mt:5}} />
                    <Typography varian={'body'}>{data.kd_jurnal} , {data.tahun_terbit}</Typography>
                </Paper>

                <Box sx={{mt:3, width:'50%'}}>
                    <TableContainer >
                    <Table sx={{minWidth:'100%'}}>
                        <TableBody>

                            <TableRow>
                                <TableCell>Rumus Cosine Similarity</TableCell>
                                <TableCell align="left">(Query*Dokumen)/(akar(Query*Dokumen))</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Nilai didapatkan</TableCell>
                                <TableCell align="left">{data.dot_product} / {data.akar_result}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Nilai Cosine</TableCell>
                                <TableCell align="left">{data.cosine_similarity}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Dalam bentuk %</TableCell>
                                <TableCell align="left">{Number(data.cosine_similarity * 100).toFixed(2)} %</TableCell>
                            </TableRow>

                        </TableBody>

                    </Table>
                </TableContainer>
                </Box>
            </Box>
        </Layout>
    )
}

export default jurnalDetail;


export async function getServerSideProps(context){
    const { params } = context;
    
    const res = await fetch('http://localhost/mytfidf/API/_getPencarianId.php?id='+params.jurnalDetail) 
    const data = await res.json()

    return {
        props: {
            data: data,
            fallback: false
        }
    }
}
