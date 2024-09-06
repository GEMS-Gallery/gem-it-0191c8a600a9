import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Rating, Button, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface GemStone {
  id: bigint;
  name: string;
  description: string;
  image: string;
  rating: bigint | null;
}

const GemStoneDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gemStone, setGemStone] = useState<GemStone | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchGemStone = async () => {
      try {
        const result = await backend.getGemStone(BigInt(id!));
        if ('ok' in result) {
          setGemStone(result.ok);
        } else {
          console.error('Error fetching gem stone:', result.err);
        }
      } catch (error) {
        console.error('Error fetching gem stone:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGemStone();
  }, [id]);

  const handleRating = async (newValue: number | null) => {
    if (newValue && id) {
      try {
        const result = await backend.rateGemStone(BigInt(id), BigInt(newValue));
        if ('ok' in result) {
          setUserRating(newValue);
          // Update the gemStone state with the new rating
          setGemStone(prevState => prevState ? {...prevState, rating: BigInt(newValue)} : null);
        } else {
          console.error('Error rating gem stone:', result.err);
        }
      } catch (error) {
        console.error('Error rating gem stone:', error);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!gemStone) {
    return <Typography>Gem stone not found</Typography>;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={gemStone.image}
        alt={gemStone.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {gemStone.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {gemStone.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current Rating: {gemStone.rating ? Number(gemStone.rating) : 'Not rated'}
        </Typography>
        <Rating
          name="gem-rating"
          value={userRating || (gemStone.rating ? Number(gemStone.rating) : 0)}
          onChange={(event, newValue) => handleRating(newValue)}
        />
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={() => window.history.back()}>
          Back to Gallery
        </Button>
      </CardContent>
    </Card>
  );
};

export default GemStoneDetail;
