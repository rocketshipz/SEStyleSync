// client/src/components/ProductCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating, IconButton } from '@mui/material';
import { Visibility, ShoppingCart, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                height: '100%', // Ensure all cards in a grid have same height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                },
                position: 'relative', // For hover effects
                overflow: 'hidden'
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={product.image || '/assets/images/placeholder.jpg'} // Use default placeholder if no image
                alt={product.name}
                sx={{ objectFit: 'cover' }}
            />

            {/* Optional: Hover overlay for quick actions - replicate template's hover effect */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, bottom: 0, left: 0, right: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                    '&:hover': {
                        opacity: 1,
                    }
                }}
            >
                <IconButton component={Link} to={`/product/${product._id}`} sx={{ color: 'white', mx: 1 }}>
                    <Visibility fontSize="large" />
                </IconButton>
                <IconButton sx={{ color: 'white', mx: 1 }}>
                    <FavoriteBorder fontSize="large" /> {/* Add to Wishlist */}
                </IconButton>
                <IconButton sx={{ color: 'white', mx: 1 }}>
                    <ShoppingCart fontSize="large" /> {/* Add to Cart */}
                </IconButton>
            </Box>


            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    ${product.price ? product.price.toFixed(2) : 'N/A'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating name="read-only" value={product.rating || 0} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.numReviews || 0} reviews)
                    </Typography>
                </Box>
            </CardContent>
            {/* You can add Add to Cart button or other actions here if not in hover */}
        </Card>
    );
}

export default ProductCard;