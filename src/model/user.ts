import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs";



export interface User extends Document{
    username:string;
    email:string;
    password:string;
   
}

const userSchema:Schema<User>=new Schema({
        username:{
        type:String,
        required:[true,"user name is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
       match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Robust email regex
      'Please use a valid email address (e.g., user@example.com)'
    ]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    
   
    
},{timestamps:true})


userSchema.pre("save",async function (next) {
    if(this.isModified("password")){
        try {
           this.password=  await bcrypt.hash(this.password,10);
        } catch (error) {
            return ;
        }
       

    }
    next();
    
})

const Usermodel = mongoose.models.User || mongoose.model<User>('User', userSchema);
export default Usermodel;

