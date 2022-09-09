const express = require('express')
const router = express.Router()
const models = require('../../../../models')

router.post('/', (req, res, next) => {
	(async () => {

		const nowDt = new Date()
		const createItem = {
			adName: req.body.adName,
			createdAt: nowDt,
			updatedAt: nowDt
		}

		const create = await models.CostsAds.create(
			createItem
		).then((result) => {
			return result
		}).catch((e) => {
			console.log('ERROR！')
			throw new Error(e)
		})

		res.json({
			message: create
		})

	})(res, next).catch((e) => {
		console.log('SERVER ERROR: ' + e)
		res.status(500)
		res.json({
			message: 'SERVER ERROR: ' + e
		})
	})
})


module.exports = router
