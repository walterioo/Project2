"use strict";
module.exports = (sequelize, DataTypes) => { //bringing in the connecion info of our database and also DataType
  const Report = sequelize.define("Report", {

    firstName: {

  

      type: DataTypes.STRING,
      allowNull: false
     
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        len: [7,20],
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
      validation: {
        notEmpty: true
      }
    },

    category: {
      type: DataTypes.STRING,
      allowNull: true,
      validation: {
        notEmpty: true
      }
    },
   
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validation: {
        notEmpty: true
      }
    }, 
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: DataTypes.BOOLEAN
  }, {});
  Report.associate = function() {
    // associations can be defined here
  };
  return Report; //returning it to be able when another file calls it.
};