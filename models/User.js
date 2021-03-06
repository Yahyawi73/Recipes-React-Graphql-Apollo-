import mongoose, { Schema }
    from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    jointDate: {
        type: Date,
        default: Date.now,
    },
    favorites: {
        type: [Schema.Types.ObjectId],
        ref: "Recipe"
    }
})

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    })
})

const User = mongoose.model('User', UserSchema)

export default User;