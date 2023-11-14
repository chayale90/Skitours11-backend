import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import db from '../models/index.js';
import NodeCache from 'node-cache';
const Vehicle = db.Vehicle;
const Helment = db.Helment;
const Equipment = db.Equipment;
const Lesson = db.Lesson;
const City = db.City;
const Airport = db.Airport;
const Skilllevel = db.Skilllevel;
const Availability = db.Availability;

const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const apiCache = new NodeCache({ stdTTL: 600 });

export const handleGetAssets = async function(req,res){
  const assets = apiCache.get('assets');
  if(apiCache.has('assets')){
    return res.status(200).json({assets});
  }
  try {
    var vehicles = await Vehicle.findAll({
      attributes:{exclude:["createdAt,updatedAt"]}
    })
    vehicles = vehicles.map((v)=>{
      return {name:v.name,id:v.id,destination:v.destination,price:v.price,passengers:{min:v.min_passengers,max:v.max_passengers},childs:{min:v.min_childs,max:v.max_childs}};
    });

    var helmets = await Helment.findAll({
      attributes:{exclude:["createdAt","updatedAt"]}
    })
    var equipments = await Equipment.findAll({
      attributes:{exclude:["createdAt","updatedAt"]}
    })

    var lessons = await Lesson.findAll({
      attributes:{exclude:["createdAt","updatedAt"]}
    })

    var cities = await City.findAll({
      attributes: {exclude:["createdAt", "updatedAt"]}
    })

    var skilllevels = await Skilllevel.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"]}
    })

    var availabilities = await Availability.findAll({
      attributes: { exclude: ['type','createdAt','updatedAt'] }
    })

    
    const assets = {
      vehicles,
      helmets,
      equipments,
      lessons,
      cities,
      skilllevels,
      availabilities
    }
    apiCache.set('assets',assets,300);
    return res.status(200).json({assets});
  } catch (error) {
    return res.status(404).json({message:"Failed to load content."});
  }
}

export const handleGetAirportsByCity = async function(req,res){
  const {id} = req.params;
  try {
    const airports = await Airport.findAll({
      where: {cityId:id},
      attributes: {exclude:['createdAt','updatedAt','cityId']}
    });
    return res.status(200).json({airports});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

export const handleGetTranslations = function(req,res){
    let translations = getAllTranslations();
    let enTrans = {};
    let heTrans = {};
    Object.keys(translations).forEach((key,i)=>{
      enTrans[key] = translations[key].en;
      heTrans[key] = translations[key].he;
    })
    translations = {'en-US':enTrans,'he-IL':heTrans};
    res.status(200).json({translations});
}

const getAllTranslations = () => {
  let content = fs.readFileSync(__dirname+'/../languages/en.json');
  return JSON.parse(content);
}