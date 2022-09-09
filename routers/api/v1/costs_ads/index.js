const express = require('express')
const router = express.Router()
const models = require('../../../../models')


router.get('/', (req, res) => {
	(async () => {

		const rows = await models.CostsAds.findAll({
			raw: true,
			nest: true
		}).then((row) => {
			return row
		})
		res.json(rows)


	})(res).catch((e) => {
		console.log('SERVER ERROR: ' + e)
		res.status(500)
		res.json({
			message: 'SERVER ERROR: ' + e,
		})
	})
})


module.exports = router
