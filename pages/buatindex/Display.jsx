import { Close } from "@mui/icons-material"
import { Modal, Box, styled } from "@mui/material"
import DataIndex from "../../components/buat_index/DataIndex"

const HeadInfo = styled(Box)((({theme}) => ({
    backgroundColor: '#fff',
    padding: 6,
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


const Display = ({kata,open, setOpen}) => {
    return(
        <Modal
        open={open}
    >
    
        <Box sx={{position:'absolute', left:600, top:50, width:'800px'}}>
            <HeadInfo display={'flex'} justifyContent='space-between'>
                Result
                <Close onClick={() => setOpen(false)} sx={{color:"#ff6b81"}} />
            </HeadInfo>

            <BodyInfo>
                <DataIndex kata={kata} />
            </BodyInfo>
        </Box>

    </Modal>
    )
}

export default Display;