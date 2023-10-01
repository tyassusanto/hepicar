const express = require('express');
const route = express.Router();
const servicesController = require('../controllers/services');
const common = require('../common/common')

route.get('/', common.auth, servicesController.searchName) // done
route.post('/add', common.auth, servicesController.addService) // done
route.delete('/delete/:id', common.auth, servicesController.deleteService) // done
route.put('/update/:id', common.auth, servicesController.updateService)
module.exports = route