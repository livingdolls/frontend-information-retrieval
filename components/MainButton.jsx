import { Button, styled } from "@mui/material";

const ButtonAccent = styled(Button)((({theme}) => ({
    backgroundColor: '#fe6b81',
    padding: 2,
    fontSize:'12px',
    fontWeight: 'bolder',
    color: '#fff',
    marginLeft:1,
    '&:hover': {
        backgroundColor: '#ee6b81',
      }
  })))

const MainButton = ({ children, ...props }) => {
    return(
        <ButtonAccent
        {...props}
        >
            {children}
        </ButtonAccent>
    )
}

export default MainButton;