import React from "react";
import { TextField, MenuItem, Button, Typography, Box } from "@mui/material";

const Filter = ({ filters, setFilters, applyFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Filter Products
      </Typography>
      <TextField
        name="category"
        label="Category"
        select
        value={filters.category}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Phone">Phone</MenuItem>
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="TV">TV</MenuItem>
        <MenuItem value="Earphone">Earphone</MenuItem>
        <MenuItem value="Tablet">Tablet</MenuItem>
        <MenuItem value="Charger">Charger</MenuItem>
        <MenuItem value="House">House</MenuItem>
        <MenuItem value="Keypad">Keypad</MenuItem>
        <MenuItem value="Bluetooth">Bluetooth</MenuItem>
      </TextField>
      <TextField
        name="minPrice"
        label="Min Price"
        type="number"
        value={filters.minPrice}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="maxPrice"
        label="Max Price"
        type="number"
        value={filters.maxPrice}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={applyFilters}
        fullWidth
        sx={{ mt: 2 }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filter;
