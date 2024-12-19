const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// definisakn schema untuk fakultas
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
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre("save", async function(next) {
    // jika passwordnya tidak diubah, lanjutkan tanpa enkripsi
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // enkripsi password
})

module.exports = mongoose.model('User', userSchema);