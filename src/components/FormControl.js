import React from 'react';
import styled from 'styled-components';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

// Styled component for the form control wrapper
const StyledFormControl = styled.div`
margin: 20px;
background-color: #ebebeb;
border-radius: 8px;
padding: .5rem;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
transition: transform 0.3s ease-in-out;
`;


export const DifficultySelect = ({ value, onChange }) => (
    <StyledFormControl>
        <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select value={value} onChange={(e) => onChange(e.target.value)} label="Difficulty">
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
            </Select>
        </FormControl>
    </StyledFormControl>
);


export const ThemeSelect = ({ value, onChange }) => (
    <StyledFormControl>
        <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="theme-label">Theme</InputLabel>
            <Select value={value} onChange={(e) => onChange(e.target.value)} label="Theme">
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
            </Select>
        </FormControl>
    </StyledFormControl>
);

export const GridSizeSelect = ({ value, onChange }) => (

    <StyledFormControl >
        <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="grid-size-label">Grid Size</InputLabel>
            <Select value={value} onChange={(e) => onChange(e.target.value)} label="Grid Size">
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
            </Select>
        </FormControl>
    </StyledFormControl>
);