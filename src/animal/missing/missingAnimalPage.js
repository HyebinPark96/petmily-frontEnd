import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../style/content.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const MissingAnimalPage = () => {

  const [missingAnimalList, setMissingAnimalList] = useState([]); 

  const getMissingAnimalList = () => {
    axios.get('/api/animal/selectMissingAnimalList')
    .then((result) => {
      setMissingAnimalList(result.data.response.body.items.item);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getMissingAnimalList();
  }, [])

  return (
      <div class="cards-container">
        {missingAnimalList.map((missingAnimal) => ( 
          <Card sx={{ maxWidth: 300 }} className="card">
            <CardActionArea>
              <CardMedia
                className="card-media"
                component="img"
                src={missingAnimal.filename}
                alt="green iguana"
              />
              <CardContent className="card-content">
                <Typography gutterBottom variant="h5" component="div">
                  {missingAnimal?.kindCd} 
                </Typography>
                <Typography variant="div" component="div">
                  공고기간: {missingAnimal?.noticeSdt} ~ {missingAnimalList?.noticeEdt}
                </Typography>
                <div className="care-addr">
                <Typography variant="body2" color="text.secondary">
                  보호장소: {missingAnimalList?.careAddr}
                </Typography>
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
  )
}

export default MissingAnimalPage