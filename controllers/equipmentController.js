import db from '../models/index.js';

const Equipment = db.Equipment;

export const handleEquipmentAdd = async function(req,res){
    const {name,equipment_type,age_type,days} = req.body.data;
    if(!name || !age_type || !equipment_type || !days){
      return res.status(424).json({message:"Error! Values missing."});
    }
    if(equipment_type === 'helmet' || equipment_type === 'skipass'){
      const equipment = await Equipment.findOne({
        where: {equipment_type}
      })
      if(equipment){
        return res.status(424).json({message: "Error! Only one "+equipment_type+" entry is allowed."});
      }
    }
  
    try {
      await Equipment.create({
        name,
        age_type,
        equipment_type,
        days
      });
      const equipments = await Equipment.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({equipments,message:"Added! Equipment added successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
  }

  export const handleUpdateEquipment = async function(req,res){
    const {name,age_type,days} = req.body.data;
    const {id} = req.body;
    if(!name || !age_type || !days){
      return res.status(424).json({message:"Error! Values missing."});
    }
    try {
      await Equipment.update({
        name,
        age_type,
        days
      },{
        where: {
          id
        }
      });
      const equipments = await Equipment.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({equipments,message:"Updated! Equipment updated successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
  }

  export const handleGetEquipments = async function(req,res){
    try {
      const equipments = await Equipment.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({equipments});
    } catch (error) {
      return res.status(404).json({message:"Error! "+error});
    }
  }

  export const handleGetEquipment = async function(req,res){
    const {id} = req.params;
    try{
      const equipment = await Equipment.findOne({
        where: {
          id
        }
      })
      return res.status(200).json({equipment});
    }catch(error){
      return res.status(424).json({message:"Error!"+error});
    }
  }
  
  export const hanldeEquipmentRemove = async function(req,res){
    const {id} = req.params;
    if(!id){
      return res.status(424).json({message:"Error! while deleting equipment."});
    }
    try {
      await Equipment.destroy({
        where: {
          id:id
        }
      })
      const equipments = await Equipment.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({equipments,message:"Removed! Equipment removed successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
  }