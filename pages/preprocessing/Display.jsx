import { Close } from "@mui/icons-material"
import { Modal, Box, styled } from "@mui/material"
import TokenIndex from "../../components/token_text/TokenIndex"
import CaseText from "./CaseText"

const HeadInfo = styled(Box)((({theme}) => ({
    backgroundColor: '#fff',
    padding: 8,
    fontSize:'19px',
    fontWeight: 'bolder',
    color: '#fff',
    borderRadius: '5px 5px 0 0',
  })))

const BodyInfo = styled(Box)((({theme}) => ({
    backgroundColor: '#fff',
    padding: 8,
    fontSize:'15px',
    position:'relative',
    overflow:'scroll',
    height:'70vh'
  })))


const Display = ({data,open, setOpen}) => {
    return(
        <Modal
        open={open}
    >
    <Box sx={{position:'absolute', left:480, top:50, width:'1200px'}}>
        <HeadInfo display={'flex'} justifyContent='space-between'>
            Result

            <Close onClick={() => setOpen(false)} sx={{color:"#ff6b81"}} />
        </HeadInfo>

        <BodyInfo>
           {data.term && <CaseText data = {data} />}
           {data[0] && <TokenIndex data = {data} />}
        </BodyInfo>
    </Box>
    </Modal>
    )
}

export default Display;