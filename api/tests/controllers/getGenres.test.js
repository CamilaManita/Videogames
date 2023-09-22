require('dotenv').config();
const axios = require('axios');
const getGenres = require('../../src/controllers/getGenres.controllers');
const { Genre } = require('../../src/db');
const { API_GENRES, API_KEY } = process.env;

// Conectar a la base de datos antes de todas las pruebas
beforeAll(async () => {
  // Realiza cualquier configuración inicial aquí, si es necesario
});

// Escribir pruebas
describe('getGenres function', () => {
  it('should fetch and create genres in the database', async () => {
    // Simular la respuesta de la API
    const mockApiResponse = {
      data: {
        results: [
          { name: 'Action' },
          { name: 'Drama' },
        ],
      },
    };

    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockApiResponse); // Simular la llamada a la API

    // Espiar la función findOrCreate de Sequelize
    const findOrCreateSpy = jest.spyOn(Genre, 'findOrCreate');

    // Ejecutar la función getGenres
    const result = await getGenres();

    // Verificar que axios.get fue llamado con la URL correcta
    expect(axios.get).toHaveBeenCalledWith(`${API_GENRES}?key=${API_KEY}`);

    // Verificar que Genre.findOrCreate fue llamado con los géneros correctos
    expect(findOrCreateSpy).toHaveBeenCalledWith({
      where: { name: 'Action' },
    });
    expect(findOrCreateSpy).toHaveBeenCalledWith({
      where: { name: 'Drama' },
    });

    // Verificar que la función devuelve el resultado esperado
    expect(result).toBe('genresCreated');

    // Restaurar la función axios.get y Genre.findOrCreate después de la prueba
    axios.get.mockRestore();
    findOrCreateSpy.mockRestore();
  });
});

// Después de todas las pruebas, realiza cualquier limpieza necesaria aquí
afterAll(async () => {
  // Realiza la limpieza, como cerrar conexiones, si es necesario
});
