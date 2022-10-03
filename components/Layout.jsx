import { Grid } from "@mui/material";
import Navbar from "./Navbar";

const Layout = (props) => {
    return(
        <Grid container direction={'row'} spacing={3} p={3} sx={{backgroundColor:'hsl(0 0% 90%)'}}>
            <Grid item xs={2}>
                <Navbar />
            </Grid>

            <Grid item xs={10}>
                {props.children}
            </Grid>
        </Grid>
    )
}

export default Layout;