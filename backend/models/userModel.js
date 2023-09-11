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
    password: { type: String, required: true },
    pic: {
      type: String,
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dunknown%2Buser&psig=AOvVaw0AxQa3MUsg5h8_p7vHnvfL&ust=1694443424550000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCOCFl-ejoIEDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

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
