import { Search } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import MainInput from "../../components/Form/MainInput";
import Layout from "../../components/Layout";
import MainButton from "../../components/MainButton";
import BoxResult from "./BoxResult";

const Pencarian = () => {
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    jml: 0,
    data: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate
    if (!query) {
      setAlert({ alert: true, pesan: 'Title tidak boleh kosong', severity: 'error' })
      setTimeout(() => {
        setAlert({ alert: false, pesan: 'Title tidak boleh kosong', severity: 'error' })
        setLoading(false)
      }, 2000);
      return ''
    }

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/_getPencarian.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'query': query
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data)
        setLoading(false)
      })
  }
  
  return (
    <Layout judulmenu="Pencarian Jurnal">
      <Box>
        <form onSubmit={handleSubmit}>
          <MainInput
            placeholder="Kata Kunci Pencarian"
            size="small"
            onChange={(e) => setQuery(e.target.value)}
            sx={{width:'629px'}}
          />

          <MainButton type="submit" sx={{ padding: '7px' }}>
            <Search />
          </MainButton>
        </form>
      </Box>

      {loading
        ?
        <CircularProgress sx={{ ml: '300px' }} />
        :
        <BoxResult result={result} />
      }
    </Layout>
  )
}

export default Pencarian;
