import db from '../models/index.js';

const City = db.City;
const Airport = db.Airport;

export const handleGetAllCities = async function(req,res){
    try {
      const cities = await City.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({cities});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
}

export const handleAddCity = async function(req,res){
    const {name} = req.body.data;
    if(!name){
      return res.status(424).json({message:"Error! Values missing."});
    }
    try {
      await City.create({
        name
      });
      const cities = await City.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({cities,message:"Added! City added successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
}

export const handleUpdateCity = async function(req,res){
    const {name} = req.body.data;
    const {id} = req.body;
    if(!name){
      return res.status(424).json({message:"Error! Values missing."});
    }
    try {
      await City.update({
        name
      },{
        where: {
          id
        }
      });
      const cities = await City.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      });
      return res.status(200).json({lessons,message:"Updated! City updated successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
}

export const handleRemoveCity = async function(req,res){
    const {id} = req.params;
    try{
      const cityToRemove =await City.findOne({where:{id:id},include:Airport})
      await cityToRemove.destroy();
      const cities = await City.findAll({
        attributes: {exclude:['createdAt','updatedAt']}
      })
      return res.status(200).json({cities,message:"Removed! City removed successfully."});
    }catch(error) {
      return res.status(424).json({message:"Error! "+error});
    }
}

export const handleGetAllAirports = async function(req,res){
    try {
      const airports = await Airport.findAll({
        include: City,
        attributes: {exclude:['createdAt','updatedAt','cityId']}
      });
      return res.status(200).json({airports});
    } catch (error) {
      console.log("Erorr get all airports>>",error)
      return res.status(424).json({message:"Error! "+error});
    }
}

export const handleAddAirport = async function(req,res){
    const {name,cityId} = req.body.data;
    if(!name || !cityId){
      return res.status(424).json({message:"Error! Values missing."});
    }
    try {
      await Airport.create({
        name,
        cityId
      });
      const airports = await Airport.findAll({
        include: City,
        attributes: {exclude:['createdAt','updatedAt','cityId']}
      });
      return res.status(200).json({airports,message:"Added! Airport added successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
}

export const handleUpdateAirport = async function(req,res){
    const {name,cityId} = req.body.data;
    const {id} = req.body;
    if(!name || !cityId){
      return res.status(424).json({message:"Error! Values missing."});
    }
    try {
      await City.update({
        name,
        cityId
      },{
        where: {
          id
        }
      });
      const airports = await Airport.findAll({
        include: City,
        attributes: {exclude:['createdAt','updatedAt','cityId']}
      });
      return res.status(200).json({airports,message:"Updated! Airport updated successfully."});
    } catch (error) {
      return res.status(424).json({message:"Error! "+error});
    }
}

export const handleRemoveAirport = async function(req,res){
    const {id} = req.params;
    try{
      await Airport.destroy({where: {id: id}});
      const airports = await Airport.findAll({
        include: City,
        attributes: {exclude:['createdAt','updatedAt','cityId']}
      })
      return res.status(200).json({airports,message:"Removed! City removed successfully."});
    }catch(error) {
      return res.status(424).json({message:"Error! "+error});
    }
}