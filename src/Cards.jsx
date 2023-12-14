import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AddRounded } from '@mui/icons-material';
import { CartContext } from './App';
import Sidebar from './Sidebar';

function Cards() {
  const {open, setOpen, uId, setId, counter, setCounter} = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/category/electronics")
      .then(function (response) {
        setProducts(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  const handleAdd = (e, id) => {
    e.target.innerText = "Added"    
    setId(id);
    setCounter((prev) => prev + 1);
    setOpen(true)
  }

  return (
    <>
      <Container>
        <Grid container spacing={4}>
        {
          products.map((el) => (
          <Grid key={el.id} item xs={4}>
            <Card sx={{maxWidth: 300}}>
              <CardMedia sx={{height:200}} image={el.image} title={el.title} />
                <CardContent>
                  <Typography gutterBottom variant="h6" sx={{lineHeight: 1.2, width: "100%", overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {el.title}
                  </Typography>
                  <Typography variant="body2" sx={{height: 75, overflow: "hidden", textOverflow: 'ellipsis'}}>
                    {el.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={(e) => handleAdd(e, el.id)} startIcon={<AddRounded/>} variant="contained" size="small">Add to cart</Button>
                </CardActions>
            </Card>
          </Grid>
        ))
      }
        </Grid>
      </Container>
      {uId === null ? '' : <Sidebar />}
    </>
  )
}

export default Cards
