const Assignment = require('../models/Assignment')

const getAllAssignments = async (req,res) => {
	try {
		const {id: classID} =  req.params
		const assignments = await Assignment.find({classId: classID}).sort({updatedAt : -1})
		res.status(201).json({assignments})
	} catch(err) {
		res.status(400).json({msg: "Somenthing isnt right"})
	}
    //res.send('get all assignments')
}

const createAssignment = async (req,res) => {
	const user = req.user
    try {
		const {id: classID} = req.params
		const assignment = new Assignment({
			title: req.body.title,
			content: req.body.content,
			submissions: [],
			classId: classID,
			due: new Date(req.body.due),
			
		})
		await assignment.save()
		res.status(201).json({assignment})
	} catch(err) {
		res.status(400).json({msg: "Somenthing isnt right cant create ass"})
	}
    //res.send('create Student')
}

const getAssignment = async (req,res) => {
	try {
		const {cid: classID} = req.params
		const {id: assID} = req.params
		const assignment = await Assignment.findOne({_id: assID})
		if(!assignment) {
			return res.status(404).json({msg: "No assignment with this id"})
		}
		if(assignment.classId != classID) {
			return res.status(404).json({msg: "No such assignment associated with this class"})
		}
		res.status(201).json({assignment})
	} catch(err) {
		console.log(err)
		res.status(400).json({msg: "Somenthing isnt right cant get ass"})
	}
    //res.status(201).json({assignment})
    //res.send('create Student')
}

const deleteAssignment = async (req, res, next) => {
	try {
		const {id: assID} = req.params
		const assignment = await Assignment.findOneAndDelete({ _id: assID })
		if (!assignment) {
			return res.status(404).json({msg: "No assignment with this id"})
		}
		res.status(201).json({assignment})
	} catch(err) {
		res.status(400).json({msg: "Somenthing isnt right cant remove ass"})
	}
}

const updateAssignment = async (req, res) => {
    try {
		const {cid: classID} = req.params
		const { id: assID } = req.params
		temp = await Assignment.findOne({_id: assID})
		if(temp.classId != classID) {
			return res.status(404).json({msg: "No such assignment associated with this class"})
		}
		const assignment = await Assignment.findOneAndUpdate({ _id: assID },{ title: req.body.title,content: req.body.content,due: new Date(req.body.due) }, {
			new: true,
			runValidators: false,
		})

		if (!assignment) {
			return res.status(404).json({msg: "No assignment with this id"})
		}

		res.status(200).json({ assignment })
    } catch (err) {
		console.log(err)
		res.status(400).json({msg: "Somenthing isnt right cant get ass"})
    }
}

module.exports = {
    createAssignment,
    getAllAssignments,
	getAssignment,
	updateAssignment,
	deleteAssignment
}