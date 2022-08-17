const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:8,
        select:false
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""

    },
    contacts:{
        type:[String],
        default:[]
    }

},{
    timestamps:true
})

UserSchema.pre('save', async function(next) {
        if(!this.isModified("password")) {
            next();
        }
    
       
        this.password=await  bcrypt.hash(this.password,10);
    
    
})

UserSchema.methods.comparePassword=function(candidatePassword) {
    console.log(this.password)
    return bcrypt.compareSync(candidatePassword,this.password);
} 

UserSchema.methods.createJWT=function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"30d"})
}





module.exports=mongoose.model("User",UserSchema);