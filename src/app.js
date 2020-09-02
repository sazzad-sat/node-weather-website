const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Paths for Express configurations
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Handlebars engine configurations
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

// Static files configurations
app.use(express.static(publicDir));

// Routes configurations
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Sazzad Ahmed',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sazzad Ahmed',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sazzad Ahmed',
        message: 'How can I help you?',
    });
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        message: '404 Help article not found.'
    });
});

app.get('/weather', (req, res) => {
    let address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must provide an address.',
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        let obj;

        if (error)
            return res.send({ error });

        forecast(latitude, longitude, (error, fData) => {
            if (error)
                return res.send({ error });
            else
                res.send({
                    address: location,
                    forecast: fData,
                });
        });
    });

});

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Sazzad Ahmed',
        message: 'Page Not Found',
    });
});

// Server configurations
app.listen(port, () => {
    console.log(`Server started at port ${port}.`);
});
