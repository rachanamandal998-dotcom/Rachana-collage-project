const { messages } = require("../database")

exports.createContact = async (req,res) =>{
  const {email,name,message} = req.body
  if(!email || !name || !message){
   return res.status(400).json({
      message:"please provide the above details"
    })
  }
  await messages.create({
    email,
    name,
    message
  })
  return res.status(201).json({
    message:"contact form submitted successfully"
  })
}

exports.getMessage = async(req,res) =>{
  const data  = await messages.findAll()
  res.status(200).json({
    message:"message fetched successfully",
    data
  })
}
