const User = require("../models/user-model");
const bcrypt = require("bcrypt")

const home = async(req,res) => {
        try {
                await res.status(200).send("Hello this is the home route from controllers")
        } catch (error) {
                res.status(401).json({
                                msg: "server error"
                        })
        }
}

const register = async(req,res) => {
        try {
                const {username, email, phone, password} = req.body;
                const userExist = await User.findOne({email: email});
                if(userExist){
                        return res.status(400).json({msg: "Email is already exists"});
                }

                //hash password
                const saltRound = 10;
                const hash_password = await bcrypt.hash(password, saltRound);

                const userCreated = await User.create({username, email, phone, password: hash_password});

                await res.status(200).json({
                        msg: "registration successfully!",
                        token: await userCreated.generateToken(),
                        userId: userCreated._id.toString(),
                });
                console.log(req.body);

        } catch (error) {
                res.status(401).json({
                                msg: "Invalid email or password!",
                                error: error,
                        })
        }
}

const login = async(req,res) => {
        try {
                const {email, password} = req.body;
                let userExist = await User.findOne({email});
                console.log(userExist) ;

                if(!userExist){
                        return res.status(400).json({message: "Invalid Credentials"});
                }

                const user = await userExist.comparePassword(password);
                // const user = await bcrypt.compare(password, userExist.password)

                if(user){
                        console.log(req.body);
                        res.status(200).json({
                                msg: "Login successfully!",
                                token: await userExist.generateToken(),
                                userId: userExist._id.toString(),
                        });
                }else{
                        res.status(401).json({
                                msg: "Invalid email or password!"
                        })
                }
        } catch (error) {
                console.log(error);
        }
}

const user = async(req,res) => {
        try {
                const userData = req.user;
                console.log(userData);
                return res.status(200).json({ userData })
        } catch (error) {
                console.log(`error from the user route ${error}`); 
        }
}



module.exports = {home, register, login, user};