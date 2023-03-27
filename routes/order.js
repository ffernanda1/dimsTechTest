var express = require('express');
var router = express.Router();
var models = require('../models/index');
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await models.order.findAll()
    res.json(new Response(data))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.get('/:id_order', async function (req, res, next) {
  try {
    console.log(req.params.id_order)
    const data = await models.order.findOne({
      where: {
        id_order: req.params.id_order
      }
    })
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    res.status(500).json(new Response('not found', "gagal"))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { id_order_detail, id_costumer, total_price } = req.body
    console.log(req.body)
    const data = await models.order.create({ id_order_detail, id_costumer, total_price})
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.put('/:id_order', async function (req, res, next) {
  try {
    const { id_order_detail, id_costumer, total_price} = req.body
    const data = await models.order.update({ id_order_detail, id_costumer, total_price},
      {
        where: {
          id_order: req.params.id_order
        }
      })
    const data2 = await models.order.findOne({
      where: {
        id_order: req.params.id_order
      }
    })
    res.json(new Response(data2, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.delete('/:id_order', async function (req, res, next) {
  try {
    const data = await models.order.destroy({
      where: {
        id_order: req.params.id_order
      }
    })
    const data2 = await models.order.findOne({
      where: {
        id_order: req.params.id_order
      }
    })
    res.status(404).json(new Response(`Order with ID ${req.params.id_order} has been deleted`, "Not Found"))

  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal Delete"))
  }
});

module.exports = router;
