const Student = require('../models/Student')
const otpFiles=require('./sendmail')
const getAllStudents = (req,res) => {
    res.send('get all students')
}

const createStudent = async (req,res) => {
    console.log(req.body)
    const student = await Student.findOne({ name: req.body.name , rollno:req.body.roll})
    console.log(student)
    if(student.length==0)
    {
        res.status(404).json({message:"no such student found"});
    }
    else
    {
        try{
          await otpFiles.sendotpEmail({user_id:student._id,email:student.email,role:"Student"})
          res.status(200).json({user_id:student._id,user_email:student.email})
        }
        catch(err){
          console.log(err)
          res.status(400).json({message:"Error sending otp"})
        }
    }
}

module.exports = {
    createStudent,
    getAllStudents,
}