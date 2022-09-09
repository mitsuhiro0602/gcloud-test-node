const express = require('express')
const router = express.Router()
const models = require('../../../../models')

router.patch('/:adId', (req, res, next) => {
  (async () => {

    const adId = Number(req.params.adId)
    if (!adId) {
      res.status(400).json({
        message: '変更するadIdが検出されなかったので、処理が中断されました。'
      })
    }

    // const latestData = await models.CostsAds.findOne({
    //   where: {
    //     adId
    //   }
    // }).then((result) => {
    //   return result.dataValues
    // })

    // if (new Date(latestData.updatedAt).toISOString() !== req.body.updatedAt) {
    //   res.status(400).json({
    //     message: '【ERROR】最新データが見つかりました。ページを再読込します...'
    //   })
    //   return
    // }

    const updateItem = {
      adId,
      adName: req.body.adName
    }

    const patch = await models.CostsAds.update(
      updateItem,
      {
        where: {
          adId
        }
      }
    ).then((result) => {
      return result
    }).catch((e) => {
      console.log('ERROR！')
      throw new Error(e)
    })

    res.json({
      message: patch
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
