const express = require('express')
const router = express.Router()
const wonders = require('./wonders').wonders

router.get('/wonders', function (req, res) {
    res.send(wonders)
})

router.post('/wonder', function (req, res) {
    console.log("Someone's trying to make a post request")
    if(!req.body.name){
        res.send('you need to enter a name')
        return
    }
    if(!req.body.location){
        res.send("you need to enter location")
        return
    }
    wonders.push({...req.body, visited: false})
    res.end()
})

router.put("/wonder/:name", function(req, res){
    let name = req.params.name
    name = name.split('-')[0].trim()
    wonders.find(w => w.name === name).visited = true
    res.end()
})

router.delete("/wonder/:name", function(req, res){
    let name = req.params.name
    name = name.split('-')[0].trim()
    let wondersIndex = wonders.findIndex(w => w.name === name)
    if(wondersIndex !== -1){
    wonders.splice(wondersIndex, 1)
}
    res.end()
})
module.exports = router