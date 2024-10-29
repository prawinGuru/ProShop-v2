import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},

email: {
    type: String,
    required: true,
    unique: true
},

password: {
    type: String,
    required: true
},

isAdmin: {
    type: Boolean,
    required: true,
    default: false
}
}, {
    timestamps: true
});

// compare the entered password to the hashed password stored in the database
userSchema.methods.matchPassword = async function (enteredPassword) {

    // compares a plain-text password with a hashed password.
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;