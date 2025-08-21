const fs = require('fs');
const Tour = require('../../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const e = require('express');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {autoIndex: true})
    .then(() => { console.log('DB connection successful!')});

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
    try {
        await Tour.create(tours);
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