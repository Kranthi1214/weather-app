const request = require('request')
const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/33c334ddc62eda2031e628e54cbb0ed5/'+latitude+','+longitude+'?'
    request({url, json:true},(error,{body})=>{

        if(error){
            callback("unable to access forecast services", undefined)
        }else if(body.error){
            callback("unable to fetch the foracast", undefined)
        }else{
            const {temperature, precipProbability}=body.currently
            callback(undefined,"It is currently"+" "+ temperature+" out. There is a "+ precipProbability +" % chance of rain.")
        }
    })

}

module.exports = forecast