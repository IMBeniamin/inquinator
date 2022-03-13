import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSliderSteps() {
  return (
    <Box sx={{ width: 1500 }}>
      <Slider
        aria-label="Small steps"
        defaultValue={2020}
        getAriaValueText={valuetext}
        step={1}
        marks
        min={1860}
        max={2021}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}

