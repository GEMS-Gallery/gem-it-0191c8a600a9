import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import Home from './components/Home';
import GemStoneDetail from './components/GemStoneDetail';
import AddGemStone from './components/AddGemStone';

const App: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gem Stone Gallery</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gem/:id" element={<GemStoneDetail />} />
          <Route path="/add" element={<AddGemStone />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
