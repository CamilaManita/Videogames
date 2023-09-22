const { Videogame, conn } = require('../../src/db');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', async () => {
        try {
          await Videogame.create({});
          // Si el create no lanza una excepción, la prueba fallará
          throw new Error('It requires a valid name');
        } catch (error) {
          // Si el create lanza una excepción, la prueba pasará
          expect(error.name).to.equal('SequelizeValidationError');
        }
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Super Mario Bros' });
      });
    });
  });
});
