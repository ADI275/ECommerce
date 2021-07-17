import bcrypt from 'bcryptjs'; // this is used for storing passwords in hash form

const Data={
    users: [
        {
            name: "Aaradhya Sharma",
            email: "sharmaaaradhya.275@gmail.com",
            password: bcrypt.hashSync('aaradhya',8), // 8 is given to automatically hash the password
            isAdmin: true
        },
        {
            name: "Raj Sharma",
            email: "raj@gmail.com",
            password: bcrypt.hashSync('raj',8), // 8 is given to automatically hash the password
            isAdmin: false
        }
    ],
    products: [
        {
            name: "Nike Shirt",
            image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/152648de-6352-4aff-a8d5-b72ac8868200/sportswear-mens-t-shirt-MK2TR1.png",
            price: 10,
            brand: "Nike",
            category: "Shirts",
            rating: 4.2,
            numReviews: 15,
            description: "high quality product",
            countInStock: 10
        },
        {
            name: "Adidas Shirt",
            image: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7050401/2018/9/26/bc435aef-ab9d-462f-87a7-f83cc0bbd0d81537980783642-Adidas-Originals-Men-Black-3-Stripes-Solid-Round-Neck-T-shir-1.jpg",
            price: 15,
            brand: "Adidas",
            category: "Shirts",
            rating: 4.3,
            numReviews: 10,
            description: "high quality product",
            countInStock: 10
        },
        {
            name: "Puma Shirt",
            image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/519770/01/mod01/fnd/IND/fmt/png/one8-Virat-Kohli-Men's-Active-Slim-T-Shirt",
            price: 13,
            brand: "Puma",
            category: "Shirts",
            rating: 4,
            numReviews: 20,
            description: "high quality product",
            countInStock: 10
        },
        {
            name: "Calvin klein Shirt",
            image: "https://i.pinimg.com/originals/49/e4/bd/49e4bdb9a42f718bca6acb893797f715.jpg",
            price: 20,
            brand: "Calvin klein",
            category: "Shirts",
            rating: 4.7,
            numReviews: 5,
            description: "high quality product",
            countInStock: 10
        },
        {
            name: "Peter England Shirt",
            image: "https://peterengland.imgix.net/img/app/product/3/341109-1642892.jpg",
            price: 8,
            brand: "Peter England",
            category: "Shirts",
            rating: 4.5,
            numReviews: 12,
            description: "high quality product",
            countInStock: 10
        },
        {
            name: "Van Heusen Shirt",
            image: "https://assets.abfrlcdn.com/img/app/product/3/313891-1442639-large.jpg",
            price: 10,
            brand: "Van Heusen",
            category: "Shirts",
            rating: 4.3,
            numReviews: 14,
            description: "high quality product",
            countInStock: 10
        }
    ]
};
export default Data;