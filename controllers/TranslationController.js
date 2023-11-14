import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

export const handleGetAll = function(req,res){
  let translations = getAllTranslations();
  res.json(translations);
}

export const handleAddTranslation = async function(req,res){
  const {title,en,he} = req.body;
  const TransAll = getTranslationData(title);

  const TransExist = Object.keys(TransAll).find((key)=>key === title);

  if(TransExist) return res.status(409).json({error:true,message:"Translation already exist!"});

  TransAll[title] = {en,he};
  saveTranslationData(TransAll);

  let translations = getAllTranslations();

  res.status(201).json({success:true,translations,message:"Added Successfully!"});
}

export const handleUpdateTranslation = async function(req,res){
  const {title,en,he} = req.body;
  const TransAll = getTranslationData(title);

  const TransExist = Object.keys(TransAll).find((key)=>key === title);

  if(!TransExist) return res.status(409).json({error:true,message:"Translation not exist!"});

  const updateTrans = Object.fromEntries(Object.entries(TransAll).filter(([key]) => key != title));

  updateTrans[title] = {en,he};
  saveTranslationData(updateTrans);

  let translations = getAllTranslations();

  res.status(201).json({success:true,translations,message:"Updated Successfully!"});
}

export const handleDeleteTranslation = async function(req,res){
  const {title} = req.body;
  const TransAll = getTranslationData(title);

  const TransExist = Object.keys(TransAll).find((key)=>key === title);
  
  if(!TransExist) return res.status(409).json({error:true,message:"Translation not exist!"});

  const updateTrans = Object.fromEntries(Object.entries(TransAll).filter(([key]) => key != title));

  saveTranslationData(updateTrans);

  let translations = getAllTranslations();

  res.status(201).json({success:true,translations,message:"Deleted Successfully!"});
}

const saveTranslationData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(__dirname+'/../languages/en.json', stringifyData)
}

const getTranslationData = () => {
  const jsonData = fs.readFileSync(__dirname+'/../languages/en.json')
  return JSON.parse(jsonData)    
}

const getAllTranslations = () => {
  let content = fs.readFileSync(__dirname+'/../languages/en.json');
  return JSON.parse(content);
}