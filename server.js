const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const useragent = require('express-useragent')

const server = express()
server.use(cors())
// server.use(bodyParser.urlencoded({
// 	extended: true
// }))
// server.use(bodyParser.json())
server.use(bodyParser.json({limit: '50mb'})) // jsonをパースする際のlimitを設定
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}))// urlencodeされたボディをパースする際のlimitを設定

server.use(useragent.express())

const costsAds = require('./routers/api/v1/costs_ads/index')
const costsAdsCreate = require('./routers/api/v1/costs_ads/create')
const costsAdsPatch = require('./routers/api/v1/costs_ads/patch')
const costsAdsDelete = require('./routers/api/v1/costs_ads/delete')

// server.use('/api/v1/costs_kinds', costsKinds)

server.use('/api/v1/costs_ads', costsAds)
server.use('/api/v1/costs_ads', costsAdsCreate)
server.use('/api/v1/costs_ads', costsAdsPatch)
server.use('/api/v1/costs_ads', costsAdsDelete)

// console.log('process.env.MICRO_CMS_API_URL')
// console.log(process.env.MICRO_CMS_API_URL)

console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV)
server.listen(8080, () => {
	console.log('Listening on port ' + 8080)
})


// const express = require('express');
// const server = express();
//
// server.get('/', (req, res) => {
// 	res.send('こんにちは最強さん');
// });
//
// // Listen to the App Engine-specified port, or 8080 otherwise
// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
// 	console.log(`Server listening on port ${PORT}...`);
// });
