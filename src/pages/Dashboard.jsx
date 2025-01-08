import React from 'react';
import styles from '../styles/DashboardPage.module.css';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Container, 
  Button 
} from '@mui/material';
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const products = [
    {
      label: "Chocolate Cake",
      description: "A rich, moist chocolate cake layered with creamy chocolate frosting, perfect for celebrations or indulgent treats.",
      imgPath: "/images/chocolate_cake.jpeg",
      price: "$12.99"
    },
    {
      label: "Blueberry Muffins",
      description: "Freshly baked muffins bursting with juicy blueberries, offering a delightful balance of sweetness and tartness.",
      imgPath: "/images/blueberry_muffins.jpeg",
      price: "$4.50"
    },
    {
      label: "Handmade Breads",
      description: "Soft, golden-brown loaves baked to perfection, bringing the comforting taste of freshly made bread to your table.",
      imgPath: "/images/handmade_breads.jpeg",
      price: "$6.75"
    }
    ,
    {
      label: "Biscuits",
      description: "Crisp and buttery biscuits, perfect for pairing with tea or coffee, crafted for a delightful crunch.",
      imgPath: "/images/biscuits.jpeg",
      price: "$6.75"
    }
    ,
    {
      label: "Doughnuts",
      description: "Soft and fluffy doughnuts glazed or dusted with sugar, offering a sweet and satisfying treat.",
      imgPath: "/images/doughnuts.jpeg",
      price: "$6.75"
    }
    ,
    {
      label: "Pies",
      description: " Delicious handmade pies with flaky crusts and rich, flavorful fillings, perfect for any occasion.",
      imgPath: "/images/pies.jpeg",
      price: "$6.75"
    }
  ];

  return (
    <Box>
      {/* Full-screen background image */}
      <Box
        sx={{
          backgroundImage: "url('/images/bakery_home.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          position: "relative"
        }}
      >
        {/* Menu Button */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 20, 
            right: 20 
          }}
        >
          <Button 
            variant="contained" 
            onClick={() => navigate("/menu")}
            sx={{
              background: 'rgba(255,255,255,0.8)',
              color: 'black',
              '&:hover': {
                background: 'white'
              }
            }}
          >
            View Today's Menu
          </Button>
        </Box>
      </Box>
      <div className={styles.heading}>
          <h2>Our Best Sellers...</h2>
        </div>
      <div className={styles.container}>
        <div className={styles.carousal}>
          {products.map((product,index)=>(
            <div className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img className={styles.productImage} src={product.imgPath} alt="product" />
              </div>
              <div className={styles.productDescription}>
                <div>
                  <h4>{product.label}</h4>
                  <p>{product.description}</p>
                </div>
                <div>
                  <h4 style={{color:"#3252a8"}}>{product.price}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default DashboardPage;