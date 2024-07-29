const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const classroom = require('./routes/classrooms')
const student = require('./routes/students')
const assignment = require('./routes/assignments')
const teacher = require('./routes/teachers')
const path=require('path')
const otp=require('./routes/otpVerification')
const resendOtp=require('./routes/resendOtp')
const cors=require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config()
//middleware
app.use(express.json())
app.use(cors({
    origin:'*'  
}))
app.use(express.static('public'))
//app.set('views',path.join(__dirname,'views'))
//app.set('view engine','ejs')
//routes
// app.get('/',(req,res) => {
//     res.render('index')    
// })

// app.get('api/v1/classroom') - get all classrooms
// app.get('api/v1/classroom/:id') - get a single classroom
// app.post('api/v1/classroom') - create new classroom
// 
app.use(cookieParser());
app.use('/api/v1/classroom',classroom)
app.use('/api/v1/student', student)
app.use('/api/v1/teacher', teacher)
app.use('/api/v1/assignment', assignment)
app.use('/api/v1/otpverify',otp)
app.use('/api/v1/resendotp',resendOtp)
port = 3000

const start = async () => {
    try {
        const connect=await connectDB(process.env.MONGO_URI)
        console.log( connect.connection.host,connect.connection.name)
        app.listen(port,console.log(`server is listening on port: ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()






