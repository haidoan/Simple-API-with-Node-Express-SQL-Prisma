const express = require('express')
const router = new express.Router()
const fixtureController = require('../controller/fixture')
const { authen } = require('../helper/middleware')
router.use('/', authen)
router.get('/fixture', fixtureController.getFixture)
router.get('/fixture/calendar', fixtureController.getCalendarFixture)

module.exports = router
