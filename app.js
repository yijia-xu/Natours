const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); // middileware

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


const getAllTours =  (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    console.log(req.params); //output id
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id) //returns the element where its id = req.params.id

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

const createTour = (req, res) => {

    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newID}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
                    JSON.stringify(tours), 
                    err => {
                        res.status(201).json({ // status: Created
                        status: 'success',
                        data: {
                            tour: newTour
                        }
                    });
                });
};

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        }); 
    }
    
    res.status(204).json({ //status: No Content
        status: 'success',
        data: null
    });
};

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

