import db from '../models/index.js';

const Availability = db.Availability;

export const handleAvailabilityAdd = async function(req,res){
    const {type,hours,timing} = req.body.data;
    if(!hours || !timing){
      return res.status(424).json({message:"Error! Values missing."});
    }
  
    try {
      await Availability.create({
        type,
        hours,
        timing
      });
      const availabilities = await Availability.findAll({
        attributes: {exclude:['type','createdAt','updatedAt']}
      });
      return res.status(200).json({availabilities,message:"Added! Availability added successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
  }
  
  export const handleGetAvailabilities = async function(req,res){
    try {
      const availabilities = await Availability.findAll({
        attributes: {exclude:['type','createdAt','updatedAt']}
      });
      return res.status(200).json({availabilities});
    } catch (error) {
      return res.status(404).json({message:"Failed to load content."});
    }
  }
  
  export const hanldeAvailabilityRemove = async function(req,res){
    const {data:id} = req.body;
    if(!id){
      return res.status(424).json({message:"Error! while deleting availability."});
    }
    try {
      await Availability.destroy({
        where: {
          id:id
        }
      })
      const availabilities = await Availability.findAll({
        attributes: {exclude:['type','createdAt','updatedAt']}
      });
      return res.status(200).json({availabilities,message:"Removed! Availability removed successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
  }