import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: "Asaaga",
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: "Simon",
            email: 'simon@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        },
    ],
    products: [
        {
            name: "Nike slim shirt",
            slug: "nike-slim-shirt",
            category: "Shirt",
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt"
        },
        {
            name: "Adidas slim shirt",
            slug: "adidas-slim-shirt",
            category: "Shirt",
            image: '/images/p2.jpg',
            price: 25,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: "high quality product"
        },
        {
            name: "Nike slim Pant",
            slug: "nike-slim-pant",
            category: "Pant",
            image: '/images/p3.jpg',
            price: 25,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: "high quality Pant"
        },
        {
            name: "Adidas Fit Pant",
            slug: "adidas-fit-pant",
            category: "Pant",
            image: '/images/p4.jpg',
            price: 65,
            countInStock: 5,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: "high quality product"
        },
    ]
}

export default data;