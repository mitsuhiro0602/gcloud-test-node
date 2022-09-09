const express = require('express')
const router = express.Router()
const models = require('../../../../models')

router.delete('/:adId', (req, res, next) => {
  (async () => {
    // const ADMIN_TOKEN = req.headers.admin_token
    // if (ADMIN_TOKEN !== process.env.ADMIN_TOKEN) {
    // 	res.status(401).json({
    // 		message: 'ADMIN_TOKENが正しくありません。ログイン処理を正しく行ってください。'
    // 	})
    // 	return
    // }

    const adId = req.params.adId
    console.log('adId: ' + adId)
    if (!adId) {
      res.status(400).json({
        message: '削除するadIdが検出されなかったので、処理が中断されました。'
      })
    }


    const destroy = await models.CostsAds.destroy({
      where: {
        adId
      },
      force: true
    }).then((result) => {
      return result
    }).catch((e) => {
      console.log('ERROR！')
      throw new Error(e)
    })

    res.json({
      message: destroy
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
