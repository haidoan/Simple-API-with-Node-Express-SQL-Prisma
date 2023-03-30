require('../config/environment')
const env = process.env.NODE_ENV
/**
 * Error handling middleware.
 */

module.exports = async (error, req, res, next) => {
    try {
        const now = new Date()
        // console.log(`[ERROR]-[${env}]-[${now}]`, error)
        if (error.message === 'INVALID_PARAMS') {
            return res.status(403).send({
                error
            })
        }
        return res.status(500).send({
            error: 'CONTACT_SUPPORT'
        })
    } catch (exception) {
        return res.status(500).send({
            errormsg: 'CONTACT_SUPPORT'
        })
    }
}