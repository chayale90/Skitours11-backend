import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

class Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Equipment.init({
    name: DataTypes.STRING,
    age_type: DataTypes.STRING,
    equipment_type: DataTypes.STRING,
    days: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("days"));
      },
      set: function(value) {
        return this.setDataValue("days", JSON.stringify(value));
      }
    }
  }, {
    sequelize,
    modelName: 'Equipment',
  });

  return Equipment;
}