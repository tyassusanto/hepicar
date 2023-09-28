const express = require('express');
const route = express.Router();
const servicesController = require('../controllers/services');
const common = require('../common/common')

route.get('/', servicesController.searchName) // done
route.post('/add', servicesController.addService) // done
route.delete('/delete/:id', servicesController.deleteService) // done
route.put('/update/:id', servicesController.updateService)
module.exports = route