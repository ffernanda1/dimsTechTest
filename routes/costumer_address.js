var express = require('express');
var router = express.Router();
var models = require('../models/index');
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await models.costumer_address.findAll()
    res.json(new Response(data))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.get('/:id_cos_dress', async function (req, res, next) {
  try {
    console.log(req.params.id_cos_dress)
    const data = await models.costumer_address.findOne({
      where: {
        id_cos_dress: req.params.id_cos_dress
      }
    })
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    res.status(500).json(new Response('not found', "gagal"))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { address_costumer_date } = req.body
    const data = await models.costumer_address.create({ address_costumer_date })
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.put('/:id_cos_dress', async function (req, res, next) {
  try {
    const { address_costumer_date } = req.body
    const data = await models.costumer_address.update({ address_costumer_date },
      {
        where: {
          id_cos_dress: req.params.id_cos_dress
        }
      })
    const data2 = await models.costumer_address.findOne({
      where: {
        id_cos_dress: req.params.id_cos_dress
      }
    })
    res.json(new Response(data2, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.delete('/:id_cos_dress', async function (req, res, next) {
  try {
    const data = await models.costumer_address.destroy({
      where: {
        id_cos_dress: req.params.id_cos_dress
      }
    })
    const data2 = await models.costumer_address.findOne({
      where: {
        id_cos_dress: req.params.id_cos_dress
      }
    })
    res.status(404).json(new Response(`Address costumer with ID ${req.params.id_cos_dress} has been deleted`, "Not Found"))

  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal Delete"))
  }
});

module.exports = router;
