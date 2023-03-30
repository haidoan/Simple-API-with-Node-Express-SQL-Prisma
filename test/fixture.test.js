const { connectDB, disconnectDB, getDBClient } = require('../config/db')
const { getFixture, getCalendarFixture } = require('../service/fixture')
beforeAll(() => {
    connectDB()
});

describe(`Test get fixture in 1 day`, () => {
    it('Not throw when valid input', async () => {
        const query = {
            from_date: '2023-03-30T17:00:00.000Z',
            duration: 2,
            limit: 10,
            page: 1
        }
        await expect(getFixture(query, 'some_path')).resolves.not.toThrow();
    });

    it('Throw when missing path', async () => {
        const query = {
            from_date: '2023-03-30T17:00:00.000Z',
            duration: 2

        }
        await expect(getFixture(query, '')).rejects.toThrow();
    });

    it('Throw when invalid from_date', async () => {
        const query = {
            from_date: 'invalid date',
            duration: 2
        }
        await expect(getFixture(query, 'fixture')).rejects.toThrow();
    });

    it('Throw when invalid from_date', async () => {
        const query = {
            from_date: '2023-03-30T17:00:00.000Z',
            duration: 100
        }
        await expect(getFixture(query, 'fixture')).rejects.toThrow();
    });

})


describe(`Test get calendar fixture`, () => {
    it('Not throw when valid input', async () => {
        const query = {
            from_date: '2023-03-30T17:00:00.000Z',
            mode: 'month'
        }
        await expect(getCalendarFixture(query)).resolves.not.toThrow();
    });


    it('Throw when invalid from_date', async () => {
        const query = {
            from_date: 'invalid_date_time',
            mode: 'month'
        }
        await expect(getCalendarFixture(query)).rejects.toThrow();
    });

    it('Throw when invalid mode', async () => {
        const query = {
            from_date: '2023-03-30T17:00:00.000Z',
            mode: 'wrong_mode'
        }
        await expect(getCalendarFixture(query)).rejects.toThrow();
    });
})

/* Close redis connection */
afterAll(done => {
    disconnectDB().then(() => {
        done();
    })
})