const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: {
            args: [3, 155]
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      released: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: false
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    { timestamps: false }
  );
};