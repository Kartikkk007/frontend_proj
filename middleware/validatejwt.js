const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let cookie= req.headers.cookie;
async function cookieParser(cookieString) { 
  // console.log(cookieString)
		if (cookieString === "") 
			return {}; 
		let pairs = cookieString.split(";"); 
    // console.log(pairs)
		let splittedPairs = pairs.map(cookie => cookie.split("=")); 
		const cookieObj = splittedPairs.reduce(function (obj, cookie) {  
			obj[decodeURIComponent(cookie[0].trim())] 
				= decodeURIComponent(cookie[1].trim()); 
			return obj; 
		}, {}) 
		return cookieObj['jwt']; 
	} 
	
	token = await cookieParser(cookie);

   if (token) {
     jwt.verify(token,"projectIT567", (err, decoded) => {
       if (err) {
        console.log("in error")
         res.status(401);
         console.log(err)
        //  throw new Error("User is not authorized");
       }
       console.log(decoded)
        req.user = decoded;
       next();
     });}

    if (!token) {
       res.status(401);
       throw new Error("User is not authorized or token is missing");
     }
};

module.exports = validateToken;