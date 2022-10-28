import { Search } from "@mui/icons-material";
import { Box, Button, CircularProgress, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Layout from "../../components/Layout";
import BoxResult from "./BoxResult";

const BoxSearch = styled(Box)((({theme}) => ({
    
})))

const Field = styled(TextField)({
    width:'629px',
    '& label.Mui-focused': {
      color: '#ff6b81',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ff6b81',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#ff6b81',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff6b81',
      },
    },
});

const Pencarian = () => {
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    jml : 0,
    data: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate
    if(!query){
      setAlert({alert:true,pesan:'Title tidak boleh kosong',severity:'error'})
      setTimeout(() => {
        setAlert({alert:false,pesan:'Title tidak boleh kosong',severity:'error'})
          setLoading(false)
      }, 2000);
      return ''
    }

    await fetch('http://localhost/mytfidf/_getPencarian.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        'query' : query
      })
    })
    .then((res) => res.json())
    .then((data) => {
      setResult(data)
      setLoading(false)
    })


  }
    return(
        <Layout>
            <Box display={'flex'} flexDirection={'column'} gap={3} sx={{backgroundColor:'#fff', padding:1, paddingLeft:5}}>
              <Box sx={{padding:'15px', backgroundColor:'#ff6b81', ml:-5, mt:-1, mr:-1}}>
                <Typography fontWeight={'bolder'} variant="h6" sx={{color:'#fff'}}>Pencarian</Typography>
              </Box>
                <BoxSearch>
                  <form onSubmit={handleSubmit}>
                    <Field
                        required
                        placeholder="Kata Kunci Pencarian"
                        size="small"
                        onChange={(e) => setQuery(e.target.value)}
                      />

                        <Button 
                          type="submit"
                          variant="contained"
                          sx={{
                            ml :1,
                            backgroundColor:'#ff6b81',
                                '&:hover': {
                                    backgroundColor: '#ee6b81',
                              }
                            }}
                            >
                                <Search />
                        </Button>
                    </form>
                </BoxSearch>
                
                {loading 
                  ?
                      <CircularProgress sx={{ml:'300px'}} />
                  :                      
                      <BoxResult result={result} />
                }
            </Box>
        </Layout>
    )
}

export default Pencarian;
