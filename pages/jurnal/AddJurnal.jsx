import { Close } from "@mui/icons-material";
import { Box, Button, Modal, styled, TextField } from "@mui/material";
import { useState } from "react";

const HeadInfo = styled(Box)((({theme}) => ({
    backgroundColor: '#ff6b81',
    padding: 16,
    fontSize:'19px',
    fontWeight: 'bolder',
    color: '#fff',
    borderRadius: '5px 5px 0 0',
    width: '700px'
  })))

const BodyInfo = styled(Box)((({theme}) => ({
    backgroundColor: '#fff',
    padding: 8,
    fontSize:'15px',
  })))

const Field = styled(TextField)({
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

const AddJurnal = ({open, setOpen, setAlert}) => {
    const [formData, setFormData] = useState({
      title : '',
      pengarang : '',
      tahun: '',
      abstrak: '',
      kode: ''
    })

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      // Validate
      if(!formData.title){
        setAlert({alert:true,pesan:'Title tidak boleh kosong',severity:'error'})
        setTimeout(() => {
          setAlert({alert:false,pesan:'Title tidak boleh kosong',severity:'error'})
            setLoading(false)
        }, 2000);
        return ''
      }

      if(!formData.pengarang){
        setAlert({alert:true,pesan:'Pengarang tidak boleh kosong',severity:'error'})
        setTimeout(() => {
          setAlert({alert:false,pesan:'Pengarang tidak boleh kosong',severity:'error'})
            setLoading(false)
        }, 2000);
        return ''
      }

      if(!formData.tahun){
        setAlert({alert:true,pesan:'Tahun tidak boleh kosong',severity:'error'})
        setTimeout(() => {
          setAlert({alert:false,pesan:'Tahun tidak boleh kosong',severity:'error'})
            setLoading(false)
        }, 2000);
        return ''
      }

      if(!formData.abstrak){
        setAlert({alert:true,pesan:'Abstrak tidak boleh kosong',severity:'error'})
        setTimeout(() => {
          setAlert({alert:false,pesan:'Abstrak tidak boleh kosong',severity:'error'})
            setLoading(false)
        }, 2000);
        return ''
      }

      if(!formData.kode){
        setAlert({alert:true,pesan:'Kode Jurnal tidak boleh kosong',severity:'error'})
        setTimeout(() => {
          setAlert({alert:false,pesan:'Kode Jurnal tidak boleh kosong',severity:'error'})
            setLoading(false)
        }, 2000);
        return ''
      }

      // End Validate

      await fetch("http://localhost/mytfidf/API/_postJurnal.php", {
        method : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          'title':formData.title,
          'pengarang':formData.pengarang,
          'tahun':formData.tahun,
          'abstrak':formData.abstrak,
          'kd_jurnal':formData.kode
        })
      })
      .then((res) =>{
        return res.json()
      })
      .then((data) => {
        setLoading(false);
        setFormData({
          title : '',
          pengarang : '',
          tahun: '',
          abstrak: '',
          kode: ''
        })

        setAlert({alert:true,pesan:data.msg,severity:'info'})
        setTimeout(() => {
          setAlert({alert:false,pesan:'data.msg',severity:'info'})
        }, 3000);
      })
    }

    const handleForm = (e) => {
      const newForm = {...formData}
      newForm[e.target.id] = e.target.value;
      setFormData(newForm);
    }


    return(
        <Modal
            open={open}
        >
        <Box sx={{position:'absolute', right:20, top:50}}>
            <HeadInfo display={'flex'} justifyContent='space-between'>
                Tambah Jurnal

                <Close onClick={() => setOpen(false)} />
            </HeadInfo>

            <BodyInfo>
                <form onSubmit={handleSubmit}>
                    <Box mt={1} mb={2} paddingX={2} sx={{display: 'flex', flexDirection:'column', gap:2}}>
                        <Field
                            label='Judul Jurnal'
                            variant="outlined"
                            fullWidth
                            value={formData.title}
                            id="title"
                            onChange={(e) => handleForm(e)}
                        />

                        <Field
                            label="Pengarang"
                            variant="outlined"
                            fullWidth
                            value={formData.pengarang}
                            id="pengarang"
                            onChange={(e) => handleForm(e)}
                        />

                        <Field 
                            label="Tahun Terbit"
                            variant="outlined"
                            fullWidth
                            value={formData.tahun}
                            id="tahun"
                            onChange={(e) => handleForm(e)}
                        />
                        
                        <Field 
                            label="Kode Jurnal"
                            variant="outlined"
                            fullWidth
                            value={formData.kode}
                            id="kode"
                            onChange={(e) => handleForm(e)}
                        />

                        <Field 
                            label="Abstrak"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            value={formData.abstrak}
                            id='abstrak'
                            onChange={(e) => handleForm(e)}
                        />

                        {loading 
                          ?
                          <Button variant="contained" 
                              disabled
                              type="submit"
                              sx={{backgroundColor:'#ff6b81',
                                '&:hover': {
                                    backgroundColor: '#ee6b81',
                                  }
                              }}
                            >
                                Loading...
                          </Button>
                          :
                          <Button variant="contained" 
                            type="submit"
                            sx={{backgroundColor:'#ff6b81',
                              '&:hover': {
                                  backgroundColor: '#ee6b81',
                                }
                            }}
                              >
                                  Tambah Jurnal
                        </Button>
                        }
                        
                    </Box>
                </form>
            </BodyInfo>
        </Box>
        </Modal>
    )
}

export default AddJurnal;