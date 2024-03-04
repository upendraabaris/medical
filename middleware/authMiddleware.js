const authMiddleware = async (req,res,next)=>{
    next();
}

const checkDomain = async (req,res,next)=>{
    next();
}

const isAdmin = async (req,res,next)=>{
    next();
}

const authMiddlewareNotCompulsory = async (req,res,next)=>{
    next();
}



module.exports = {authMiddleware, checkDomain, isAdmin, authMiddlewareNotCompulsory }