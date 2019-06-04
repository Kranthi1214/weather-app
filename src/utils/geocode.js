const request = require('request')
const geocode= (address, callback)=>{
    const mapBoxurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoia3JhbnRoaTA3IiwiYSI6ImNqdTV5ZXk0dTAxcTU0NG9oeTFtZTc0Z3UifQ.BIGVzteRIFUIr3l7721Z6A&limit=1'
request({url:mapBoxurl, json:true}, (error, {body})=>{
    if(error){
        callback("Unable to connect to location services", undefined)
    } else if(body.features.length===0){
        callback("Unable to find the location, try again ", undefined)
    } else{  
        const {center, place_name} = body.features[0]
        callback(undefined, {
            latitude:center[1],
            longitude:center[0],
            location:place_name
        })
    }
})
}
module.exports =geocode