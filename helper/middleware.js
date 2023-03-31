require('../config/environment')
const { ERROR_MSG } = require('../helper/error')

async function authen(req, res, next) {
    try {
        // TODO: authen here
        return next()
    } catch (error) {
        return res.status(401).send({
            error: ERROR_MSG.UNAUTHORIZED
        })
    }
}


module.exports = { authen }
