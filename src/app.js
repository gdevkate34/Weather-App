//import library
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


//create app
const app = express()

const port = process.env.PORT || 3000
//set paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialsPath)

//use static directory to serve
app.use(express.static(publicDirectoryPath))

//set routes to home , help, about etc
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Gajendra Devkate'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Gajendra Devkate',
        gist:'github.com/gdevkate34',
        contact:'gdevkate34@gmail.com'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Gajendra Devkate',
        contact:'gdevkate34@gmail.com',
        help:'For any queries please contact on above email.'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name : 'Gajendra Devkate',
        errorMessage: 'Error : Help article Not found!'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address term!'
        })
    }
    
    geocode(req.query.address,(error,{long,lat,location}={})=>{
        if(error){
            return res.send({error})
        }else{
            // console.log(data)
            forecast(long,lat,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    location:location,
                    forecastData: forecastData
                })
                
            
            })
        }
        
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name : 'Gajendra Devkate',
        errorMessage: 'Error : Page Not found!'
    })
})
//method to start server
app.listen(port,()=>{
    console.log("Server started !")
})