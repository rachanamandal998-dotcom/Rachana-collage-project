const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { admins } = require('../database')


exports.handleAdminLogin= async (req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
    return res.status(403).json({
      message:'please provide email or password'
    })
  }
  const [data]=  await admins.findAll({
    where:{
      email:email
    }
  })
  if(!data){
    return res.status(403).json({
      message:'No user found'
    })
  }
    const isMatched= bcrypt.compareSync(password,data.password)
    if(!isMatched){
    return res.status(403).json({
      message:"Invalid email or password"
    })
    }
    const token = jwt.sign({id:data.id}, "echo",{
      expiresIn:'10d'
    })
    res.status(200).json({
      message:'Login Successfully',
      data:token
    })
  }
