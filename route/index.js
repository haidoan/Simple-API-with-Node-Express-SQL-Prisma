const express = require('express')
const router = new express.Router()
const fixtureController = require('../controller/fixture')
router.get('/fixture', fixtureController.getFixture)
router.get('/fixture/calendar', fixtureController.getCalendarFixture)

module.exports = router
