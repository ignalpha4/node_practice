import jwt from "jsonwebtoken";

const secretkey = "fThNr'{p]bbfyC;2,3KKUVN}lmbWv;!b005UNkK='kh0DQYxAu"

export const generateTokenProfile=(profile_obj)=>{
    const token = jwt.sign(profile_obj,secretkey);
    return token;
}

export const validateTokenProfile=(token)=>{
    try {
        const decoded = jwt.verify(token,secretkey);
        return decoded;

    } catch (error) {
        console.log(error);
    }
}


