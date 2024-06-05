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

const App = () => {
  const [images, setImages] = useState([]);
  const [searchImage, setSearchImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')


  const fetchImage = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random/20')
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

  const filteredImages = images.filter(image =>
    image.includes(searchImage.toLowerCase())
  )
  const breedName =  (url) =>{
    const parts = url.split('/');
    const breedPart = parts[4];
    return breedPart.replace('-','').replace('/','')

  }
  const CapitalizeWord =(str) =>{
    return str.replace(/\b\w/g, char =>char.toUpperCase())
  }
  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Dog Image Gallery
      </Typography>
      <TextField
        label="Search by breed"
        variant='outlined'
        fullWidth
        margin='normal'
        value={searchImage}
        onChange={(e) => setSearchImage(e.target.value)}
      />
      {loading && <CircularProgress />}
      {error && <Typography color={error}>{error}</Typography>}
      <Grid container spacing={2}>
        {filteredImages.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia component="img"
                height="200"
                image={image}
                alt='dog image'/>
                <CardContent>
                  <Typography variant='body2' color="textSecondary">
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
