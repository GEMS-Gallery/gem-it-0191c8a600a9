import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface GemStone {
  id: bigint;
  name: string;
  description: string;
  image: string;
  rating: bigint | null;
}

const Home: React.FC = () => {
  const [gemStones, setGemStones] = useState<GemStone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGemStones = async () => {
      try {
        const stones = await backend.getGemStones();
        setGemStones(stones);
      } catch (error) {
        console.error('Error fetching gem stones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGemStones();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Gem Stone Gallery
      </Typography>
      <Button component={Link} to="/add" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Add New Gem Stone
      </Button>
      <Grid container spacing={3}>
        {gemStones.map((gemStone) => (
          <Grid item xs={12} sm={6} md={4} key={Number(gemStone.id)}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={gemStone.image}
                alt={gemStone.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {gemStone.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {gemStone.description.substring(0, 100)}...
                </Typography>
                <Button component={Link} to={`/gem/${gemStone.id}`} variant="outlined" color="primary" style={{ marginTop: '10px' }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
