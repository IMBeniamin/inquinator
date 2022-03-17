import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import axios from 'axios'
import './stickyNav.css'

export default function TimeSlider(props) {
  let timeout;
  const [value, setValue] = React.useState(props.year);

  const updateValue = (value) => {
    if (typeof value === 'number') {
      setValue(value);
    
      axios.get(`http://localhost/api/v1`,{
        params:{
          year: value,
          filter: "iso_code,co2"
        }
      })
      .then(res => props.parentCallback(res.data))
    }
  }

  const handleChange = (event, value) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('change');
      updateValue(value);  
    }, 1000);
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
        onChange={handleChange}
      />
    </Box>
  );
}

