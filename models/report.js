'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
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
        len: [1,20],
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
    },
    report: {
      type: DataTypes.TEXT,
      allowNull: false,
      validation: {
        len: [10,13]
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
    }, 
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: DataTypes.BOOLEAN
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
  };
  return Report;
};