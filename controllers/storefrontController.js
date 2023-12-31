import db from '../models/index.js';


const Helment = db.Helment;
const Equipment = db.Equipment;
const Lessontype = db.Lessontype;
const Skilllevel = db.Skilllevel;

//Helments

export const handleHelmentAdd = async function(req,res){
  const {name,price} = req.body.data;
  if(!name || !price){
    return res.status(424).json({message:"Error! while adding helment. Value is missing."});
  }

  try {
    await Helment.create({
      name,
      price
    });
    const helments = await Helment.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({helments,message:"Added! Helment added successfully."});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

export const handleGetHelments = async function(req,res){
  try {
    const helments = await Helment.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({helments});
  } catch (error) {
    return res.status(404).json({message:"Failed to load content."});
  }
}

export const hanldeHelmentRemove = async function(req,res){
  const {data:id} = req.body;
  if(!id){
    return res.status(424).json({message:"Error! while deleting helment."});
  }
  try {
    await Helment.destroy({
      where: {
        id:id
      }
    })
    const helments = await Helment.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({helments,message:"Removed! Helment removed successfully."});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

// Equipments

export const handleEquipmentAdd = async function(req,res){
  const {name,price} = req.body.data;
  if(!name){
    return res.status(424).json({message:"Error! while adding equipment. Name is missing."});
  }

  try {
    await Equipment.create({
      name,
      price
    });
    const equipments = await Equipment.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({equipments,message:"Added! Equipment added successfully."});
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
    return res.status(404).json({message:"Failed to load content."});
  }
}

export const hanldeEquipmentRemove = async function(req,res){
  const {data:id} = req.body;
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

//LessonTypes

export const handleLessonTypeAdd = async function(req,res){
  const {name} = req.body.data;
  if(!name){
    return res.status(424).json({message:"Error! while adding lesson-type. Name is missing."});
  }

  try {
    await Lessontype.create({
      name
    });
    const lessontypes = await Lessontype.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({lessontypes,message:"Added! LessonType added successfully."});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

export const handleGetLessonTypes = async function(req,res){
  try {
    const lessontypes = await Lessontype.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({lessontypes});
  } catch (error) {
    return res.status(404).json({message:"Failed to load content."});
  }
}

export const hanldeLessonTypeRemove = async function(req,res){
  const {data:id} = req.body;
  if(!id){
    return res.status(424).json({message:"Error! while deleting lesson-type."});
  }
  try {
    await Lessontype.destroy({
      where: {
        id:id
      }
    })
    const lessontypes = await Lessontype.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({lessontypes,message:"Removed! LessonType removed successfully."});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

//Skill Levels

export const handleSkillLevelAdd = async function(req,res){
  const {name,type} = req.body.data;
  if(!name || !type){
    return res.status(424).json({message:"Error! while adding skill-leve. Name or Type is missing."});
  }

  try {
    await Skilllevel.create({
      name,
      type
    });
    const skilllevels = await Skilllevel.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({skilllevels,message:"Added! Skill-Level added successfully."});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

export const handleGetSkillLevels = async function(req,res){
  try {
    const skilllevels = await Skilllevel.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({skilllevels});
  } catch (error) {
    return res.status(404).json({message:"Failed to load content."});
  }
}

export const hanldeSkillLevelRemove = async function(req,res){
  const {data:id} = req.body;
  if(!id){
    return res.status(424).json({message:"Error! while deleting skill-level."});
  }
  try {
    await Skilllevel.destroy({
      where: {
        id:id
      }
    })
    const skilllevels = await Skilllevel.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({skilllevels,message:"Removed! Skill-Level removed successfully."});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}