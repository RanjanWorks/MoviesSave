import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function Sort({ setType }) {
  const handleChange = (event, newValue) => {
    setType(newValue); // Update type in App when an option is selected
  };

  return (
    <div className='px-4 lg:px-16 my-5'>
      <Select
        placeholder="Sort Movies…"
        onChange={handleChange} // Call handleChange on option selection
        sx={{
          width: 255,
          [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
            [`&.${selectClasses.expanded}`]: {
              transform: 'rotate(-180deg)',
            },
          },
        }}
      >
        <Option value="top_rated">Top Movies</Option>
        <Option value="popular">Popular Movies</Option>
        <Option value="now_playing">Now Playing</Option>
        <Option value="upcoming">Upcoming</Option>
       
      </Select>
    </div>
  );
}
