const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const e = require('express');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {autoIndex: true})
    .then(() => { console.log('DB connection successful!')});

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false }); 
        await Review.create(reviews);
        console.log('Data successfully loaded');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete all data from DB
const deleteData = async () => {
    try {
        await Tour.deleteMany(); //delete all docs
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}