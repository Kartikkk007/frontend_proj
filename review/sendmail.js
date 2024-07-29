const otpVerification=require('../models/otpVerification')
const nodemailer = require('nodemailer')
const bcrypt=require('bcrypt')
const xoauth2=require('xoauth2')
const { google } = require('googleapis');
const oAuth2Client = new google.auth.OAuth2(
    '238817520058-dm4a3ffpcr8k4cuqsi9cuhjovif2j979.apps.googleusercontent.com',
    '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',
    'https://developers.google.com/oauthplayground'
  );
  
  // Set the access token
  oAuth2Client.setCredentials({
    access_token: 'ya29.a0AfB_byDb1qV1z6oYaKV8zLpBQOFR-3sTXUSskQKWFCe-W_X1BHcWqW9lnyouYm-sraGgYJLcD3JQ3bbvKDT6z8rRSWAzCM4_ohyuhbmaqPdxwdegzPYl8_PT0Qq4Q5gBCz8stjh_pxVZMcXs5F7r7fh-FRp3FsEXvSppaCgYKAZkSARMSFQHGX2MiQez45TuajR_ELbskq4tYzA0171',
  });
  
  // Create the transporter using OAuth2 authentication
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'studentteacherportal840@gmail.com',
      clientId: '238817520058-dm4a3ffpcr8k4cuqsi9cuhjovif2j979.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//04K23rD8L2OZcCgYIARAAGAQSNwF-L9IrQIzdRrmRk_ZwBu2LHD5ojw6QezmHDIiFt7LiXnG2F9r1dONLFHX99r972ESuDugid-c',
      accessToken: oAuth2Client.getAccessToken(),
    },
  });
const sendotpEmail=async({user_id,email,role},res)=>{
  console.log("sending otp")
  const otp=`${Math.floor(100000+Math.random()*900000)}`
  const mailoptions={
      from:'studentteacherportal840@gmail.com',
      to:email,
      subject:"Verify your Email",
      html:`<p>Your otp is <b>${otp}</b> to complete your login</p>`
  }
  const saltRounds=10
  const hashedOTP=await bcrypt.hash(otp,saltRounds)
  console.log("Date",Date.now())
  const newOTPrecord=new otpVerification({
      userId:user_id,
      otp:hashedOTP,
      docModel:role,
      createdAt:Date.now(),
      expiresAt:Date.now()+130000,
  })
  await newOTPrecord.save()
  return transporter.sendMail(mailoptions)
}

module.exports = {
    sendotpEmail,
}