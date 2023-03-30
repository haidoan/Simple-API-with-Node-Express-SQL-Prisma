const { getDBClient } = require('../config/db')
const moment = require('moment');
const APP_API = `${process.env.APP_API}`
const Joi = require('@hapi/joi')
const fixtureService = {
    /**
     * Get all matches within a period of time
     * @param {Object} reqQuery - express request query
     * @param {Number} reqQuery.page - page index
     * @param {Number} reqQuery.limit - page size
     * @param {String} reqQuery.from_date - page size
     * @param {Number} reqQuery.duration - time duration in day unit
     * @param {String} path - api path
     * @returns list of matches and paging infomation
     */
    getFixture: async (reqQuery, path) => {
        try {
            const { error } = Joi.object({
                page: Joi.number().optional(),
                limit: Joi.number().optional(),
                duration: Joi.number().optional().min(1).max(7),
                from_date: Joi.date().required(),
                path: Joi.string().required().min(1)
            }).validate({ ...reqQuery, path })

            if (error) {
                throw new Error('INVALID_PARAMS')
            }
            const page = parseInt(reqQuery.page) || 1;
            const limit = parseInt(reqQuery.limit) || 10;
            const fromDate = moment(reqQuery.from_date);
            let duration = parseInt(reqQuery.duration);

            const toDate = moment(fromDate).add(duration, 'day');
            const query = {
                where: {
                    deleted_at: undefined,
                    play_at: { gte: fromDate.toDate(), lt: toDate.toDate() }
                },
                select: {
                    name: true,
                    tournament: {
                        select: {
                            name: true,
                            logo: true
                        }
                    },
                    type: true,
                    play_at: true,
                    home_team: {
                        select: {
                            name: true,
                            logo: true
                        }
                    },
                    away_team: {
                        select: {
                            name: true,
                            logo: true
                        }
                    }
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    play_at: 'asc'
                }
            }

            const matches = await getDBClient().match.findMany(query);
            const total = await getDBClient().match.count({
                where: query.where
            });
            let next
            if (matches.length === limit) {
                // according to UI, client only go to next page when user scroll to the end of page
                // its better to paging from back-end side with next page link to save 1 READ db to get `total`
                // (rarely happen) worst case there is no data in next link if total % limit = 0
                next = `${APP_API}${path}?page=${page + 1}&limit=${limit}`
            }

            return { matches, total, next, page, limit }
        } catch (err) {
            throw err;
        }
    },
    /**
     * Get all date which has at least 1 match plays
     * @param {*} reqQuery 
     * @param {String} reqQuery.from_date - page index
     * @param {String} reqQuery.mode - enum value to tell API return data in 1 month or 1 year period
     * @returns object with key is date(format `YYYY-MM-DD`) which has match plays
     */
    getCalendarFixture: async (reqQuery) => {
        try {
            const { error } = Joi.object({
                mode: Joi.string().required().valid('month', 'year'),
                from_date: Joi.date().required()
            }).validate(reqQuery)
            if (error) {
                throw new Error('INVALID_PARAMS')
            }
            const fromDate = moment(reqQuery.from_date)
            const toDate = moment(fromDate).add(1, reqQuery.mode)
            const query = {
                where: {
                    date: { gte: fromDate.toDate(), lt: toDate.toDate() },
                    deleted_at: undefined
                }
            }
            const dateWithMatches = await getDBClient().calendar.findMany(query);
            const calendar = {}
            // put value in object for faster mapping game in a specific date in client side
            dateWithMatches.forEach(match => {
                calendar[moment(match.date).format("YYYY-MM-DD")] = true;
            })
            return calendar;
        } catch (error) {
            throw error
        }
    }
}

module.exports = fixtureService