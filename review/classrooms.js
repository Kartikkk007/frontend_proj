const Class = require('../models/Class')
const teacher=require('../models/Teacher')
const mongoose= require('mongoose')
// const ObjectId = mongoose.Types.ObjectId;

const getAllClasses = async(req,res) => {
    // res.send('get all classes')
    // Class.find({}).populate({path: 'teacher',model: 'Teacher'}).then((result) => res.send(result)).catch((err) => res.send(err))
        const user = req.user;
		console.log(user)
        try {
            let classes = [];
            if (user.role =='Student') {
                console.log("in student classrrom")
                classes = await Class.find({
                    students: { $elemMatch: { user: user.id } },
                });
            } else if (user.role =='Teacher') {
                classes=await Class.find({})
                classes=classes.filter((doc)=>{return String(doc.teacher)==String(user.id)})
                console.log(classes)
            } else {
                throw 'Unauthorized User';
            }
            const result={
                role:user.role,
                classes:classes,
            }
            console.log(result)
            res.status(200).json(result);
        } catch (e) {
            console.log(e)
            res.status(404).json({ error: e || 'Something went wrong!' });
        }
    };

const getClass = (req,res) => {
    console.log("hi")
    console.log("in getCLassbyID")
    console.log(req.params.id)
    console.log("hehe")
    res.json({id: req.params.id})
    //res.send('get single class')
}

const createClass = async (req,res) => {
    const classroom = await Class.create({title:req.body.name,teacher:req.user.id,course:req.body.course})
    res.status(201).json({classroom})
    //res.send('create class')
}

// const removeClass = () => {

// }

module.exports = {
    getAllClasses,
    getClass,
    createClass,
}