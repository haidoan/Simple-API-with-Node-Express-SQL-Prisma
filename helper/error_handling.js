require('../config/environment')
const env = process.env.NODE_ENV
/**
 * Error handling middleware.
 */

const saveErrorLogDB = async (error) => {
    // TODO: save and notify developer about error
    console.log(`Error is saved ${error.message}`)
}

module.exports = async (error, req, res, next) => {
    try {
        const now = new Date()
        // console.log(`[ERROR]-[${env}]-[${now}]`, error)
        if (error.message === 'INVALID_PARAMS') {
            return res.status(403).send({
                error
            })
        }
        // Save unexpected error
        await saveErrorLogDB(error)

        return res.status(500).send({
            error: 'CONTACT_SUPPORT'
        })
    } catch (exception) {
        return res.status(500).send({
            errormsg: 'CONTACT_SUPPORT'
        })
    }
}