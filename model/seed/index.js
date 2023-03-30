const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const seedStadiums = async () => {
    const stadiums = [
        {
            name: 'Anfield'
        },
        {
            name: 'Camp now'
        }
    ]

    await prisma.stadium.createMany({
        data: stadiums,
        skipDuplicates: true
    })
    console.log('Done seeding stadiums');
}

const seedTournaments = async () => {
    const tournaments = [
        {
            name: 'Premier League',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxLhCCLIkhYe6-DtlYUXoS3ZX6oJE_ebl-Irrv17w&s'
        },
        {
            name: 'Champion League',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROlCPXF5rNtX3fyr_T8Eehq_VMbOuyWnOOrJcrp4meog&s'
        }
    ]

    await prisma.tournament.createMany({
        data: tournaments,
        skipDuplicates: true
    })
    console.log('Done seeding tournaments');
}


const seedTeams = async () => {
    const teams = [
        {
            name: 'Manchester United',
            short_name: 'MU',
            nation: 'UK',
            logo: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e7.png',
        },
        {
            name: 'Liverpool',
            short_name: 'LIV',
            nation: 'UK',
            logo: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e5.png',
        },
        {
            name: 'Real Mandrid',
            short_name: 'RMA',
            nation: 'SPAIN',
            logo: 'https://banner2.cleanpng.com/20180602/psw/kisspng-real-madrid-c-f-uefa-champions-league-la-liga-juv-5b1351b072b362.2456057615279927524698.jpg',
        },
        {
            name: 'Barca',
            short_name: 'BAR',
            nation: 'SPAIN',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtdM-qOVfXzK6gSWrJSE_oywGX63OTkGhip2WiVl4&s',
        },
        {
            name: 'Manchester City',
            short_name: 'MC',
            nation: 'UK',
            logo: 'https://w1.pngwing.com/pngs/203/356/png-transparent-premier-league-logo-manchester-manchester-city-fc-organization-line-area-circle-symbol.png',
        },
        {
            name: 'Arsenal',
            short_name: 'ARS',
            nation: 'UK',
            logo: 'https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png',
        },
        {
            name: 'Chelsea',
            short_name: 'CHE',
            nation: 'UK',
            logo: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c4e1.png',
        }
    ]

    await prisma.team.createMany({
        data: teams,
        skipDuplicates: true
    })
    console.log('Done seeding teams');
}


const seedMatches = async (teams, stadiums, tournaments) => {
    // console.log(stadiums, tournaments)
    const matches = [
        {
            name: 'Final Match',
            tournament_id: tournaments[0].id,
            round: 'final',
            play_at: new Date('2023-03-30T09:40:36.060Z').toISOString(),
            type: 'COMPETITION',
            stadium_id: stadiums[0].id,
            home_team_id: teams[0].id,
            away_team_id: teams[2].id,
            home_team_score: 0,
            away_team_score: 3,
        },

        {
            name: 'Semi Final Match',
            tournament_id: tournaments[0].id,
            round: 'final',
            play_at: new Date('2023-04-01T03:30:36.060Z').toISOString(),
            type: 'COMPETITION',
            stadium_id: stadiums[1].id,
            home_team_id: teams[2].id,
            away_team_id: teams[3].id,
            home_team_score: 2,
            away_team_score: 2,
        },

        {
            name: 'Semi Final Match',
            tournament_id: tournaments[0].id,
            round: 'final',
            play_at: new Date('2023-04-02T01:30:36.060Z').toISOString(),
            type: 'COMPETITION',
            stadium_id: stadiums[1].id,
            home_team_id: teams[1].id,
            away_team_id: teams[3].id,
            home_team_score: 2,
            away_team_score: 2,
        },

        {
            name: 'Semi Final Match',
            tournament_id: tournaments[0].id,
            round: 'final',
            play_at: new Date('2023-03-30T04:00:36.060Z').toISOString(),
            type: 'COMPETITION',
            stadium_id: stadiums[1].id,
            home_team_id: teams[2].id,
            away_team_id: teams[1].id,
            home_team_score: 2,
            away_team_score: 2,
        },
        {
            name: 'Semi Final Match',
            round: 'final',
            type: 'FRIENDLY',
            play_at: new Date('2023-04-02T01:45:36.060Z').toISOString(),
            stadium_id: stadiums[0].id,
            home_team_id: teams[2].id,
            away_team_id: teams[3].id,
            home_team_score: 0,
            away_team_score: 2,
        }

    ]

    await prisma.match.createMany({
        data: matches,
        skipDuplicates: true
    })

    const calendarFixture = matches.map(match => {
        return {
            date: match.play_at
        }
    })

    await prisma.calendar.createMany({
        data: calendarFixture,
        skipDuplicates: true
    })

    console.log('Done seeding matches');
}

async function main() {
    console.log('Seeding database...')
    await seedStadiums()
    await seedTournaments()
    await seedTeams()
    const stadiums = await prisma.stadium.findMany();
    const tours = await prisma.tournament.findMany();
    const teams = await prisma.team.findMany();
    await seedMatches(teams, stadiums, tours)
    console.log('Done seeding database...')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })