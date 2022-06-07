import {v4 as uuid} from 'uuid'

const data = {
  products: [
    {
      _id: uuid(),
      name: 'Nike Slim Shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      images: [
        '/images/nike/shirts/p1.jpg',
        '/images/nike/shirts/p1-2.jpg',
        '/images/nike/shirts/p1-3.jpg',
        '/images/nike/shirts/p1-4.jpg',
        '/images/nike/shirts/p1-5.jpg'
      ],
      price: 88,
      countInStock: 0,
      brand: 'Nike',
      rating: 5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      _id: uuid(),
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      images: ['/images/adidas/shirts/p2.jpg'],
      price: 75,
      countInStock: 25,
      brand: 'Adidas',
      rating: 4.2,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      _id: uuid(),
      name: 'Nike Slim Pant',
      slug: 'nike-slim-pant',
      category: 'Pants',
      images: ['/images/nike/pants/p3.jpg'],
      price: 85,
      countInStock: 20,
      brand: 'Nike',
      rating: 4.6,
      numReviews: 18,
      description: 'high quality product',
    },
    {
      _id: uuid(),
      name: 'Adidas Fit Pant',
      slug: 'adidas-fit-pant',
      category: 'Pants',
      images: ['/images/adidas/pants/p4.jpg'],
      price: 110,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.2,
      numReviews: 15,
      description: 'high quality product',
    },
  ],
};

export default data;
