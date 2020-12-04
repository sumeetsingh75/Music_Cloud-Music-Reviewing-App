 const mongoose = require("mongoose");
 const bcrypt = require("bcryptjs");
 const userSchema = mongoose.Schema(
    {
        method:{
            type: String,
            required: true,
           enum : ['local','google','facebook']
        },
        local:{
            email:{
                type: String,
                lowercase:true
            },
            password:{
                type: String
            },
            name:{
                type: String
            }
        },
        
        facebook:{
            id:{
                type: String
            },
            email:{
                type: String,
                lowercase:true 
            },
            name:{
                type: String,
                lowercase:true 
            }
        },
        role:{
            type: String 
        },
        status:{
            type:String
        }
       
    }
);

/*Function checks user password */
userSchema.methods.isValidPassword = function(newPassword){
    try {
       return bcrypt.compare(newPassword,this.local.password)
    } catch (error) {
        throw new Error(error);
    }
};

/*Converts password into hash using Bcrypt */
userSchema.pre('save',async function(next){
    try {
        if(this.method != 'local'){
            next();
        }
        //generate salt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.password,salt);
        console.log('normal password'+ this.local.password);
        console.log('hashed password'+ passwordHash);

        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});




const User = mongoose.model('user',userSchema);
module.exports = User;