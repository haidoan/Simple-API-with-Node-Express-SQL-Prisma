
const { ERROR_MSG } = require('../helper/error')
const fixtureService = require('../service/fixture')

const userController = {
    getFixture: async (req, res, next) => {
        try {
            // call to service layer
            const { matches, total, next, page, limit } = await fixtureService.getFixture(req.query, req.path)
            return res.status(200).send({
                data: matches,
                page,
                limit,
                count: matches.length,
                total,
                next
            })
        } catch (error) {
            next(error)
        }
    },
    getCalendarFixture: async (req, res, next) => {
        try {
            // call to service layer
            const calendar = await fixtureService.getCalendarFixture(req.query)
            return res.status(200).send({ data: calendar })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = userController