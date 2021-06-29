const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // stores the new created express application
const port = process.env.PORT || 3000

// define paths for express conigs
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../template/views')
const partialDir = path.join(__dirname, '../template/partials')

// define handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialDir)

// setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'nikita'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'nikita'
    })
}) 

app.get('/help', (req,res)=>{
    res.render('help', {
        title: "help message",
        name: 'nikita'
    })
})

// query string
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "please provide an address to proceed"
        })
    } else {
        const address = req.query.address;
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                } else {
                    res.send({
                        location,
                        Forecast: forecastData,
                        address
                    })
                }
            })
        })
    }
})

// wildcard routes for error pages 
app.get('/help/*',(req,res)=>{
    res.render('error', {
        title:"Help Error",
        msg: "help article not found",
        name: 'nikita'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title:'404 page',
        msg: '404 Page not found',
        name: 'nikita'
    })
})

app.listen(port,()=>{
    console.log("server up")
})