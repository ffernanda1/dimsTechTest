var express = require('express');
var router = express.Router();
var models = require('../models/index');
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await models.order_detail.findAll()
    res.json(new Response(data))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.get('/:id_order_detail', async function (req, res, next) {
  try {
    console.log(req.params.id_order_detail)
    const data = await models.order_detail.findOne({
      where: {
        id_order_detail: req.params.id_order_detail
      }
    })
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    res.status(500).json(new Response('not found', "gagal"))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { id_product, id_pay_method, quantity, price_sell, total_price } = req.body
    console.log(req.body)
    const data = await models.order_detail.create({ id_product, id_pay_method, quantity, price_sell, total_price})
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.put('/:id_order_detail', async function (req, res, next) {
  try {
    const { id_product, id_pay_method, quantity, price_sell, total_price} = req.body
    const data = await models.order_detail.update({ id_product, id_pay_method, quantity, price_sell, total_price},
      {
        where: {
          id_order_detail: req.params.id_order_detail
        }
      })
    const data2 = await models.order_detail.findOne({
      where: {
        id_order_detail: req.params.id_order_detail
      }
    })
    res.json(new Response(data2, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.delete('/:id_order_detail', async function (req, res, next) {
  try {
    const data = await models.order_detail.destroy({
      where: {
        id_order_detail: req.params.id_order_detail
      }
    })
    const data2 = await models.order_detail.findOne({
      where: {
        id_order_detail: req.params.id_order_detail
      }
    })
    res.status(404).json(new Response(`order detail with ID ${req.params.id_order_detail} has been deleted`, "Not Found"))

  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal Delete"))
  }
});

module.exports = router;
