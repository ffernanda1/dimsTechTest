var express = require('express');
var router = express.Router();
var models = require('../models/index');
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await models.payment_method.findAll()
    res.json(new Response(data))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.get('/:id_pay_method', async function (req, res, next) {
  try {
    console.log(req.params.id_pay_method)
    const data = await models.payment_method.findOne({
      where: {
        id_pay_method: req.params.id_pay_method
      }
    })
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    res.status(500).json(new Response('not found', "gagal"))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { pay_name } = req.body
    console.log(req.body)
    const data = await models.payment_method.create({ pay_name})
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.put('/:id_pay_method', async function (req, res, next) {
  try {
    const { pay_name} = req.body
    const data = await models.payment_method.update({ pay_name},
      {
        where: {
          id_pay_method: req.params.id_pay_method
        }
      })
    const data2 = await models.payment_method.findOne({
      where: {
        id_pay_method: req.params.id_pay_method
      }
    })
    res.json(new Response(data2, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.delete('/:id_pay_method', async function (req, res, next) {
  try {
    const data = await models.payment_method.destroy({
      where: {
        id_pay_method: req.params.id_pay_method
      }
    })
    const data2 = await models.payment_method.findOne({
      where: {
        id_pay_method: req.params.id_pay_method
      }
    })
    res.status(404).json(new Response(`Payment with ID ${req.params.id_pay_method} has been deleted`, "Not Found"))

  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal Delete"))
  }
});

module.exports = router;
