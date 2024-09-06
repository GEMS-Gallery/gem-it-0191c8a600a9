import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from '../../declarations/backend';

interface FormData {
  name: string;
  description: string;
  image: string;
}

const AddGemStone: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await backend.addGemStone(data.name, data.description, data.image);
      navigate('/');
    } catch (error) {
      console.error('Error adding gem stone:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Gem Stone
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
        <Controller
          name="image"
          control={control}
          defaultValue=""
          rules={{ required: 'Image URL is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Image URL"
              fullWidth
              margin="normal"
              error={!!errors.image}
              helperText={errors.image?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '20px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Gem Stone'}
        </Button>
      </form>
    </>
  );
};

export default AddGemStone;
