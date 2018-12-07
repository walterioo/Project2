module.exports = function(sequelize, DataTypes) { 
  var Example = sequelize.define("Example", { //the .define method is used to define meppings between a model and a table.
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
