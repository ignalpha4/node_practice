import jwt from "jsonwebtoken";

const secretkey = "fThNr'{p]bbfyC;2,3KKUVN}lmbWv;!b005UNkK='kh0DQYxAu"

export const generateToken=(userId)=>{
    const token = jwt.sign({userId: userId},secretkey);
    return token;
}

export const validateToken=(token)=>{
    try {
        const decoded = jwt.verify(token,secretkey);

        return decoded.userId;

    } catch (error) {
        console.log(error);
  
    }
}




