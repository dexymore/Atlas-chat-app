const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a user must have a name"],
      trim: true,
    },
    email: { type: String,
        required: [true, 'a user must have email'],
        unique: true,
        lowercase: true,},
    password: { type: String, required: true,
      minlength: [8, 'a user password must be more or equal to 8 chars'] },
    pic: {
      type: String
    
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  
});

userSchema.pre("save", async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
