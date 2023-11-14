import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {
  class Availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Availability.init({
    type: DataTypes.STRING,
    hours: DataTypes.INTEGER,
    timing: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Availability',
  });
  return Availability;
};