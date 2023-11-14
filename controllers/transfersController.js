import db from '../models/index.js';

const Vehicle = db.Vehicle;

// Vehicles

export const handleVehicleAdd = async function(req,res){
    const {name,price,minPassengers,maxPassengers,minChilds,maxChilds,destination} = req.body.data;
    if(!name || !minPassengers || !maxPassengers || !minChilds || !maxChilds || !price || !destination){
      return res.status(424).json({message:"Error! while adding vehicle. Remember to add all values and try again."});
    }
    try {
      await Vehicle.create({
        name,
        max_passengers: maxPassengers,
        min_passengers: minPassengers,
        max_childs: maxChilds,
        min_childs: minChilds,
        price,
        destination
      });
      const vehicles = await Vehicle.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({vehicles,message:"Added! Vehicle added successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
  }
  
  
  export const handleGetVehicles = async function(req,res){
    try {
      const vehicles = await Vehicle.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({vehicles});
    } catch (error) {
      return res.status(404).json({message:"Failed to load content."});
    }
  }
  
  export const hanldeVehicleRemove = async function(req,res){
    const {data:id} = req.body;
    if(!id){
      return res.status(424).json({message:"Error! while deleting vehicle."});
    }
    try {
      await Vehicle.destroy({
        where: {
          id:id
        }
      })
      const vehicles = await Vehicle.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({vehicles:vehicles,message:"Removed! Vehicle removed successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
  }
  