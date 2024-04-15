
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 1000; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61c5d8ff18b720618a7b81d3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/tastymango/image/upload/v1641576128/YelpCamp/vwcmzwslor91wc30rqe4.jpg',
                    filename: 'YelpCamp/vwcmzwslor91wc30rqe4'
                },
                {
                    url: 'https://res.cloudinary.com/tastymango/image/upload/v1641576577/YelpCamp/51333613928_8f9f9ef4c2_c_wahukx.jpg',
                    filename: 'YelpCamp/51333613928_8f9f9ef4c2_c_wahukx'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id esse illum, suscipit ipsum sed assumenda aliquid facilis at! Fuga dolore numquam odit cupiditate delectus voluptatibus officiis sequi, fugit doloribus eos!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database connection closed!')
});
