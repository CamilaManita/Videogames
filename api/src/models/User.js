const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("User", {
    id: {
      //ID autoincrementar, no Null y llave primaria
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      //Email de registo, valida que sea un email
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      //Password no Null, y valida que tenga entre 6 y 10 caracteres y minimo 1 numero.
      type: DataTypes.STRING,
      validate: {
        is: /^(?=.*\d)(?=.*[a-zA-Z]).{6,30}$/,
        notEmpty: true,
      },
    },
  });
};
/////////////

// const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('country', {
//     id: {
//       //id no null y se valida que sea una palbra de 3 letras.
//       type: DataTypes.STRING,
//       primaryKey : true,
//       unique: true,
//       validate : {
//         is: /^[a-zA-Z]{3}$/,
//         notEmpty : true
//       }
//     },
//     name: {
//       type: DataTypes.STRING,
//       validate:{
//         notEmpty : true
//       }
//     },
//     flag: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       validate:{
//         notEmpty : true
//       }
//     },
//     continent: {
//       type: DataTypes.STRING,
//       validate : {
//         isIn: [['Americas','Africa', 'Antarctic', 'Asia', 'Europe', 'Oceania']],
//         notEmpty : true
//       }
//     },
//     capital: {
//       type: DataTypes.STRING,
//       validate:{
//         notEmpty : true
//       }
//     },
//     subregion: {
//       type: DataTypes.STRING,
//       validate:{
//         notEmpty : true
//       }
//     },
//     area: {
//       type: DataTypes.FLOAT,
//       validate:{
//         notEmpty : true
//       }
//     },
//     population: {
//       type: DataTypes.INTEGER,
//       validate:{
//         notEmpty : true
//       }
//     },
//   });
// };