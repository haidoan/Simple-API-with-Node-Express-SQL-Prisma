const { array } = require('@hapi/joi');
const request = require('supertest');
const app = require('../app')
const { connectDB, disconnectDB, getDBClient } = require('../config/db')
const moment = require('moment')

beforeAll(() => {
    connectDB()
});

describe(`Test get fixture in 1 day`, () => {
    it(`Should return data with paging`, async () => {
        const existedRandomMatch = await getDBClient().match.findFirst();
        const res = await request(app)
            .get("/fixture")
            .query({ from_date: existedRandomMatch.play_at, duration: 1 })
        expect(res.statusCode).toBe(200);
        expect(res.body).hasOwnProperty('data');
        expect(res.body).hasOwnProperty('page');
        expect(res.body).hasOwnProperty('limit');
    })

    it(`Should throw error with invalid params`, async () => {
        const res = await request(app)
            .get("/fixture")
            .query({ from_date: 'invalid_date_time', duration: 1 })
        expect(res.statusCode).toBe(403);
    })
})

describe(`Test get calendar fixture`, () => {
    it(`Should return calendar within a year`, async () => {
        // seeding match has value in the March and April
        const fromDate = moment('2023')
        const res = await request(app)
            .get("/fixture/calendar")
            .query({ from_date: fromDate.format(), mode: 'year' })
        expect(res.statusCode).toBe(200);
        expect(res.body).hasOwnProperty('data');
        // to make sure this is data of 1 year
        // since match seeding is alway in different months,
        // so take the month value of the last and first item -> make sure > 1 (different month)
        // TODO: increate test quality by try different `fromDate`
        const data = Object.keys(res.body.data);
        const firstItem = new Date(data[0]).getMonth();
        const lastItem = new Date(data[data.length - 1]).getMonth();
        expect(lastItem - firstItem).not.toBeLessThan(1);
    })

    it(`Should return calendar within a month`, async () => {
        // seeding data has match in the march 2023
        const fromDate = moment('2023-03');
        const res = await request(app)
            .get("/fixture/calendar")
            .query({ from_date: fromDate.format(), mode: 'month' })
        expect(res.statusCode).toBe(200);
        // to make sure this is data within a month
        // so take the month value of the last and first item -> make sure its = 0 (same month)
        // TODO: increate test quality by try different `fromDate`
        const data = Object.keys(res.body.data);
        const firstItem = new Date(data[0]).getMonth();
        const lastItem = new Date(data[data.length - 1]).getMonth();
        expect(lastItem - firstItem).toBe(0);
    })
})

/* Close redis connection */
afterAll(done => {
    disconnectDB().then(() => {
        done();
    })
})