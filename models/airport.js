import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Airport.belongsTo(models.City,{
        foreignKey: 'cityId',
        onDelete: 'CASCADE'
      })
    }
  }
  Airport.init({
    name: DataTypes.STRING,
    cityId: {
      type:  DataTypes.INTEGER,
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};