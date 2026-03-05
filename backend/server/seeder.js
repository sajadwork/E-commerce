import { connectDB } from './config/db.js';
import User from './models/User.model.js';
import Product from './models/Product.model.js';

const mockProducts = [
    {
        name: "EcoVac R1 Smart Cleaner",
        category: "Home",
        price: 299.00,
        rating: 4.8,
        numReviews: 128,
        image: "/images/product_cleaner.png",
        brand: "EcoVac",
        description: "A smart robotic vacuum cleaner that automatically cleans your entire home.",
        countInStock: 25
    },
    {
        name: "SonicPro X Noise Cancelling",
        category: "Music",
        price: 199.50,
        rating: 4.9,
        numReviews: 84,
        image: "/images/product_headsound.png",
        brand: "Sonic",
        description: "Premium over-ear headphones with active noise cancelling for immersive sound.",
        countInStock: 40
    },
    {
        name: "AluStand Phone Holder",
        category: "Phone",
        price: 24.99,
        rating: 4.5,
        numReviews: 320,
        image: "/images/product_phone_holder.png",
        brand: "Alu",
        description: "Sleek and durable aluminum phone stand compatible with all modern smartphones.",
        countInStock: 200
    },
    {
        name: "SecureEye 360 CCTV",
        category: "Home",
        price: 89.00,
        rating: 4.6,
        numReviews: 56,
        image: "/images/product_cctv.png",
        brand: "SecureHome",
        description: "A 360-degree high definition security camera featuring motion detection and night vision.",
        countInStock: 15
    },
    {
        name: "AirBeat TWS Earbuds",
        category: "Music",
        price: 79.99,
        rating: 4.7,
        numReviews: 210,
        image: "/images/product_earbuds.png",
        brand: "SoundBeat",
        description: "True wireless earbuds offering crisp highs, deep bass and up to 24 hours of total battery life.",
        countInStock: 100
    },
    {
        name: "EcoVac R1 Mini",
        category: "Home",
        price: 199.00,
        rating: 4.5,
        numReviews: 42,
        image: "/images/product_cleaner.png",
        brand: "EcoVac",
        description: "Compact smart cleaner ideal for apartments or smaller targeted rooms.",
        countInStock: 30
    }
];

const importData = async () => {
    try {
        await connectDB();

        await Product.deleteMany();

        // Find an existing admin user
        let adminUser = await User.findOne({ isAdmin: true });

        // Fallback to first regular user if no admin exists
        if (!adminUser) {
            adminUser = await User.findOne({});
        }

        // Fallback to creating a new mock admin if database is completely empty
        if (!adminUser) {
            adminUser = await User.create({
                name: 'Admin Owner',
                email: 'admin@stuffus.com',
                password: 'password123',
                isAdmin: true
            });
        }

        const sampleProducts = mockProducts.map(product => {
            return {
                ...product,
                user: adminUser._id
            };
        });

        await Product.insertMany(sampleProducts);

        console.log('✅ Demo Data Imported Successfully Into MongoDB!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error with seeder: ${error.message}`);
        process.exit(1);
    }
};

importData();
