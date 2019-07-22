const request = require('request')

const forecast = (long,lat,callback)=>{
    
    const url  = 'https://api.darksky.net/forecast/24a363f95e6dbd0cb784e8c47a5a252f/'+long+','+lat
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.length===0){
            callback('Unable to find location!')
        }else{
            console.log(body.daily.data[0])
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out.It noted Low temperature '+body.daily.data[0].temperatureLow +' degrees and high tempaerature, '+body.daily.data[0].temperatureHigh+' There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast