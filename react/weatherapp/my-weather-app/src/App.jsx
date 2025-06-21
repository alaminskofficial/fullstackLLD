import React from 'react';
import WeatherWidget from './features/weather/WeatherWidget';
import { CssBaseline, Box } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)',
          fontFamily: '-apple-system, BlinkMacSystemFont, San Francisco, Roboto, sans-serif',
        }}
      >
        <WeatherWidget />
      </Box>
    </>
  );
}

export default App;
