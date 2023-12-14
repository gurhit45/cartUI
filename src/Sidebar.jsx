import { Box, Button, ButtonGroup, Drawer, Paper, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { CartContext } from './App';
import axios from 'axios';
import { Add, Remove } from '@mui/icons-material';

function Sidebar() {
    const {open, setOpen, uId, counter, setCounter} = useContext(CartContext)
    const [sideData, setSideData] = useState({})
    const mainStack = (
      <Stack direction="row" spacing={2}>
        <Box>
          <img src={sideData?.image} alt={sideData?.title} style={{width: '100px'}} />
        </Box>
        <Stack>
          <Typography variant='body2' gutterBottom sx={{width: "100%", whiteSpace: 'wrap'}}>{sideData?.title}</Typography>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button size="small" onClick={(e) => {counter > 0 && setCounter((prev) => prev - 1)}}><Remove/></Button>
            <Button size="small">{counter}</Button>
            <Button size="small" onClick={() => setCounter((prev) => prev + 1)}><Add/></Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    )
  
    axios
      .get(`https://fakestoreapi.com/products/${uId}`)
      .then(function (response) {
        setSideData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  
    return (
    <>
        <Drawer open={open} onClose={() => setOpen(!open)} anchor='right'>
          <Paper elevation={1} sx={{margin: 2, padding: 2, width: '300px'}}>
            {counter > 0 ? mainStack : <Typography variant="h6">List is empty</Typography>}
          </Paper>
        </Drawer> 
    </>
  )
}

export default Sidebar
