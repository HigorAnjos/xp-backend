'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Clients',
    [
      {
        email: 'george@gmail.com',
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
        password: '$2b$10$ajyRS5vR6nXitR.DDAmNhOmanpq0027XBSJwjdi/i6R2IvTfGQpGm', //  password:1234
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        email: 'isaac@gmail.com',
        password: '$2b$10$AaUxzPF1MCwtshu/h9VJKuJS94bA8dK5KstKlHH/l4XxSgWAirxwm', //  password:1234
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        email: 'frank@gmail.com',
        password: '$2b$10$E4xfY.M9HkwYmsTOBaEEjulDlsJZa97sOZNyJOJvBLlb3ZyEGSpxq', //  password:1234
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        email: 'Julio@gmail.com',
        password: '$2b$10$m/D3cWHmEZ9zHMefRw3BHu6zZHft65Vo1fnsyfV1VEnCKTb2dur.C', //  password:1234
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Clients', null, {}),
};
