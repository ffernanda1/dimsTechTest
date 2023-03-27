var express = require('express');
var router = express.Router();
var models = require('../models/index');
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await models.costumers.findAll()
    res.json(new Response(data))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.get('/:id_costumer', async function (req, res, next) {
  try {
    console.log(req.params.id_costumer)
    const data = await models.costumers.findOne({
      where: {
        id_costumer: req.params.id_costumer
      }
    })
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    res.status(500).json(new Response('not found', "gagal"))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { id_cos_dress, costumer_name } = req.body
    console.log(req.body)
    const data = await models.costumers.create({ id_cos_dress, costumer_name})
    res.json(new Response(data, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.put('/:id_costumer', async function (req, res, next) {
  try {
    const { id_cos_dress, costumer_name} = req.body
    const data = await models.costumers.update({ id_cos_dress, costumer_name},
      {
        where: {
          id_costumer: req.params.id_costumer
        }
      })
    const data2 = await models.costumers.findOne({
      where: {
        id_costumer: req.params.id_costumer
      }
    })
    res.json(new Response(data2, "Berhasil"))
  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal"))
  }
});

router.delete('/:id_costumer', async function (req, res, next) {
  try {
    const data = await models.costumers.destroy({
      where: {
        id_costumer: req.params.id_costumer
      }
    })
    const data2 = await models.costumers.findOne({
      where: {
        id_costumer: req.params.id_costumer
      }
    })
    res.status(404).json(new Response(`costumer with ID ${req.params.id_costumer} has been deleted`, "Not Found"))

  } catch (e) {
    console.log(e)
    res.status(500).json(new Response(e, "gagal Delete"))
  }
});

module.exports = router;
