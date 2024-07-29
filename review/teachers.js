const Teacher = require('../models/Teacher')
const otpFiles=require('./sendmail')

const getAllTeachers = (req,res) => {
    res.send('get all teachers')
}

const createTeacher= async (req,res) => {
    // const teacher = await Teacher.create(req.body)
    // res.status(201).json({student})
    //res.send('create class')
    // console.log(req.body)
    const teacher = await Teacher.findOne({ teacherId: req.body.teacherId})
    // console.log(teacher)
    if(teacher.length==0)
    {
        res.status(404).json({message:"no such student found"});
    }
    else
    {
        // await Teacher.updateOne({teacherId:req.body.teacherId},{$set:{email:"21_94043anjali@dsc.du.ac.in"}})
        try{
        //   console.log(teacher.email)
        //   console.log("in try block")
          await otpFiles.sendotpEmail({user_id:teacher._id,email:teacher.email,role:"Teacher"})
          res.status(200).json({user_id:teacher._id,user_email:teacher.email})
        }
        catch(err){
            console.log(err)
          res.status(400).json({message:"Error sending otp"})
        }
    }
}

module.exports = {
    createTeacher,
    getAllTeachers
}