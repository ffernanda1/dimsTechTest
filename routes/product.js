var express = require('express');
var router = express.Router();
var models = require('../models/index');
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await models.products.findAll()
    res.json(new Response(data))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.get('/:id_product', async function (req, res, next) {
  try {
    console.log(req.params)
    const data = await models.products.findOne({
      where: {
        id_product: req.params.id_product
      }
    })
    console.log(data)
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response('not found', "gagal"))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { product_name, price } = req.body
    console.log(req.body)
    const data = await models.products.create({ product_name, price})
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.put('/:id_product', async function (req, res, next) {
  try {
    const { product_name, price} = req.body
    const data = await models.products.update({ product_name, price},
      {
        where: {
          id_product: req.params.id_product
        }
      })
    const data2 = await models.products.findOne({
      where: {
        id_product: req.params.id_product
      }
    })
    res.json(new Response(data2, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.delete('/:id_product', async function (req, res, next) {
  try {
    const data = await models.products.destroy({
      where: {
        id_product: req.params.id_product
      }
    })
    const data2 = await models.products.findOne({
      where: {
        id_product: req.params.id_product
      }
    })
    res.status(404).json(new Response(`Product with ID ${req.params.id_product} has been deleted`, "Not Found"))

  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal Delete"))
  }
});

module.exports = router;
