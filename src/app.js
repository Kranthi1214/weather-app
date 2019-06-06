const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app =express()
const port = process.env.PORT||3000
//Define paths for express config
const publicdirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setuphandlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicdirectoryPath))



app.get('', (req,res)=>{
res.render('index',{
    name: 'Kranthi',
    title: 'Weather'
})
})
app.get('/help', (req,res)=>{
res.render('help',{
    title: 'Help',
    name: 'Santhi',
    message: 'This is a help page'
})
})
app.get('/about', (req,res)=>{
res.render('about',{
    name: 'Kranthi',
    title: 'About'
})
})

app.get('/help/*', (req,res)=>{
res.render('error',{
    title:"404",
    errorMessage:"Help article not found",
    name:"Jayanthi"
})
})


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "you have to provide address"
        })
    }
      geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
  if(error){
    res.send({
            error
        })
  } 
forecast(latitude, longitude, (error, forecastData) => {
  if(error){
    res.send({
            error
        })
  } 

    res.send({
            forecast: forecastData,
            location,
            address: req.query.address
    })

}) 
})

})

app.get('*', (req,res)=>{
res.render('error',{
    title:"404",
    errorMessage:"Page not found",
    name:"Seshagiri"
})
})

app.listen(port, ()=>{
    console.log("app started listening")
})