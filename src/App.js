import React, { useEffect, useState } from 'react'
import axios from "axios";
// using @mui/material
import {
  Container,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Grid
} from "@mui/material"
import "./App.css"
const App = () => {
  const [images, setImages] = useState([]);
  const [searchImage, setSearchImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  // function for fetching data from dog.ceo api
  const fetchImage = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random/100')
      setImages(response.data.message);
      setLoading(false);
    } catch (err) {
      console.log("Error on Fetching data");
      setError("Error on Fetching Data");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImage();
  }, [])
  // function for filter name
  const filteredImages = images.filter(image =>
    image.includes(searchImage.toLowerCase())
  )
  // Function for split the image 
  const breedName = (url) => {
    const parts = url.split('/');
    const breedPart = parts[4];
    return breedPart.replace('-', '').replace('/', '')

  }
  // function for Capitalize the 1st Word
  const CapitalizeWord = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase())
  }
  return (
    <Container>
      <Typography variant='h4' gutterBottom className='title'>
        Dog Image Gallery
      </Typography>
      <TextField
        variant='outlined'
        fullWidth
        placeholder='Search By breed'
        margin='normal'
        value={searchImage}
        onChange={(e) => setSearchImage(e.target.value)}
      />
      {loading && <CircularProgress />}
      {error && <Typography color={error}>{error}</Typography>}
      <Grid container spacing={2}>
        {filteredImages.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card >
              <CardMedia
                component="img"
                height="250"
                image={image}
                alt='dog image' />
              <CardContent>
                <Typography variant='body2' color="black" fontSize={20}>
                  {CapitalizeWord(breedName(image))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

  )
}

export default App
