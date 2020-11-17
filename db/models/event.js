'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    const Event = sequelize.define('Event', {
      title: DataTypes.STRING,
      desc: DataTypes.TEXT,
      imgUrl: DataTypes.STRING //add this line (don't forget the comma above!)
    }, {});
    static associate(models) {
      // define association here
    }
  };
  Event.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
