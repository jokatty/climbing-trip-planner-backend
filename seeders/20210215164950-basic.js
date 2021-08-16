const difficulties = [1, 2, 3, 4, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15];

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ========================================================= MAKE USERS
    const userEmails = ['rock@gmail.com'];
    let usersList = [];

    for (let i = 0; i < userEmails.length; i += 1) {
      usersList.push(
        {
          email: userEmails[i],
          created_at: new Date(),
          updated_at: new Date(),
        },
      );
    }

    await queryInterface.bulkInsert('users', usersList);

    // ========================================================= MAKE TRIPS
    const tripsList = [
      {
        name: 'krabi',
        user_id: 1,
        start_date: 'Mon Aug 16 2021 14:37:37',
        end_date:'Fri Aug 20 2021 14:37:37',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'yosemite',
        user_id: 1,
        start_date: 'Mon Aug 16 2021 14:37:37',
        end_date:'Fri Aug 20 2021 14:37:37',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Koh Phi Phi',
        user_id: 1,
        start_date: 'Mon Aug 16 2021 14:37:37',
        end_date:'Fri Aug 20 2021 14:37:37',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Koh Tao',
        user_id: 1,
        start_date: 'Mon Aug 16 2021 14:37:37',
        end_date:'Fri Aug 20 2021 14:37:37',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Koh Yao Noi',
        user_id: 1,
        start_date: 'Mon Aug 16 2021 14:37:37',
        end_date:'Fri Aug 20 2021 14:37:37',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const trips = await queryInterface.bulkInsert(
      'trips',
      tripsList,
      { returning: true },
    );

    // ========================================================= MAKE ROUTES
    const routes = [];

    for (let i = 0; i < trips.length; i++) {
      const trip = trips[i];

      for (let i = 0; i < 15; i++) {
        const noun = faker.company.bsNoun(); // Rowan Nikolaus
        const adjective = faker.commerce.productAdjective(); // Rowan Nikolaus
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

        routes.push({
          name: `${adjective} ${noun}`,
          trip_id: trip.id,
          difficulty,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    queryInterface.bulkInsert('routes', routes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('routes', null, {});
    await queryInterface.bulkDelete('trips', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
