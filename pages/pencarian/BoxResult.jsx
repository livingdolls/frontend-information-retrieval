import { Box, Typography } from "@mui/material";
import CardJurnal from "./CardJurnal";

const BoxResult = ({ result }) => {
    const data = result.data;
    return(
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Typography 
                variant="subtitle2"
            >
                Menampilkan {result.jml} Jurnal yang memiliki kesamaan dengan kata kunci
            </Typography>
            
            {data.map((d) => (
                <CardJurnal d={d} key={d.id} />
            ))}

        </Box>
    )
}

export default BoxResult;