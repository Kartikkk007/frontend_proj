const otpVerification=require('../models/otpVerification')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const verifyOtp=async(req,res)=>{
    console.log(req.body)
    const{user_id,otp,email}=req.body
    console.log(user_id)
    const userverify=await otpVerification.findOne({userId:user_id})
    console.log("in otp verification")
    console.log(userverify)
    if (userverify.length==0)
    {
        res.status(404).json({message:"Account record doesn't exist or has been verified already."})
    }
    else{
        const{expiresAt}=userverify;
        const hashedOtp=userverify.otp;
        if(expiresAt<Date.now()){
            await otpVerification.deleteMany({userId:user_id})
            res.status(404).json({message:"Code has expired please request again"})
        }
        else{
            const role=userverify.docModel
            const validOtp=await bcrypt.compare(otp,hashedOtp)
            if(!validOtp)
            {
                res.status(404).json({message:"Invalid otp"})
            }
            else{
                await otpVerification.deleteMany({userId:user_id})
                console.log("otp verified")
                console.log(process.env.ACCESS_TOKEN_SECRET)
                const accessToken = jwt.sign(
                    {
                        email:email,
                        id:user_id,
                        role:role,
                    },
                    //process.env.ACCESS_TOKEN_SECRET,
					"projectIT567",
                    { expiresIn:"43200m" }
                  );
                 console.log(accessToken) 
                  res.cookie("jwt",accessToken,{httpOnly:false,expires: new Date(new Date().getTime()+30*24*60*1000)});
                  //res.render("teacher")
                 res.status(200).json({message:"Otp verification successful"})
                
            }
        }

    }
}
module.exports={
    verifyOtp,
}