import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Grid, 
  Container, 
  Box, 
  Button,
  CardActions,
  IconButton,
  Snackbar
} from '@mui/material';
import { 
  AddShoppingCart as CartIcon, 
  ShoppingBag as BuyIcon,
  Close as CloseIcon 
} from '@mui/icons-material';

const MenuComponent = () => {


  const menuItems = [
    {
      label: "Chocolate Cake",
      description: "A rich, moist chocolate cake layered with creamy chocolate frosting, perfect for celebrations or indulgent treats.",
      imgPath: "/images/chocolate_cake.jpeg",
      price: "$12.99",
      categoryname:"cake"
    },
    {
      label: "Blueberry Muffins",
      description: "Freshly baked muffins bursting with juicy blueberries, offering a delightful balance of sweetness and tartness.",
      imgPath: "/images/blueberry_muffins.jpeg",
      price: "$4.50",
      categoryname:"muffins"
    },
    {
      label: "Handmade Breads",
      description: "Soft, golden-brown loaves baked to perfection, bringing the comforting taste of freshly made bread to your table.",
      imgPath: "/images/handmade_breads.jpeg",
      price: "$6.75",
      categoryname:"breads"
    }
    ,
    {
      label: "Biscuits",
      description: "Crisp and buttery biscuits, perfect for pairing with tea or coffee, crafted for a delightful crunch.",
      imgPath: "/images/biscuits.jpeg",
      price: "$6.75",
      categoryname:"biscuits"
    }
    ,
    {
      label: "Doughnuts",
      description: "Soft and fluffy doughnuts glazed or dusted with sugar, offering a sweet and satisfying treat.",
      imgPath: "/images/doughnuts.jpeg",
      price: "$6.75",
      categoryname:"doughnuts"
    }
    ,
    {
      label: "Pies",
      description: " Delicious handmade pies with flaky crusts and rich, flavorful fillings, perfect for any occasion.",
      imgPath: "/images/pies.jpeg",
      price: "$6.75",
      categoryname:"pies"
    }
  ];

  const [cart, setCart] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Add to Cart Handler
  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    setSnackbarMessage(`${item.label} added to cart`);
    setOpenSnackbar(true);
  };

  // Buy Now Handler
  const handleBuyNow = (item) => {
    // This would typically redirect to a checkout page or open a purchase modal
    setSnackbarMessage(`Purchasing ${item.label}`);
    setOpenSnackbar(true);
  };

  // Close Snackbar Handler
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Our Menu
      </Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 3
        }}>
        {menuItems.map((item, index) => (
          <Card 
            key={index} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': { 
                transform: 'scale(1.05)',
                boxShadow: 3
              },
              height: 'auto'
            }}
            >
            <CardMedia
              component="img"
              height="250"
              image={item.imgPath}
              alt={item.label}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {item.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {item.description}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
                }}>
                <Typography variant="h6" color="primary">
                  {item.price}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.categoryname}
                </Typography>
              </Box>
            </CardContent>
            <Box sx={{ 
              p: 2, 
              pt: 0, 
              display: 'flex', 
              justifyContent: 'space-between' 
            }}>
              <Button 
                variant="outlined" 
                startIcon={<CartIcon />}
                onClick={() => handleAddToCart(item)}
                size="small"
                sx={{ mr: 1 }}
              >
                Add to Cart
              </Button>
              <Button 
                variant="contained" 
                startIcon={<BuyIcon />}
                onClick={() => handleBuyNow(item)}
                size="small"
                color="primary"
              >
                Buy Now
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Snackbar for Cart and Buy Notifications */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
};

export default MenuComponent;