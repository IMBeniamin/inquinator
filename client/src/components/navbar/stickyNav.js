import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Slider from '@mui/material/Slider';

export default function TimeSlider() {
  const [value, setValue] = React.useState(2020);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      fetch(`http://localhost/API/${newValue}`,{
          "method":"GET",
          "headers": {
              "Content-Type":"application/json"
          }
      })
      .then(res => res.json())
      .then()
    }
  };
  return (
    <Box className='slider-container'>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        orientation="vertical"
        size="small"
        aria-label="Year"
        defaultValue={value}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1950}
        max={2020}
      />
    </Box>
  );
}

