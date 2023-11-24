import { Schema, model } from 'mongoose';
import { TUser, userModel } from '../interfaces/userInterface';
import bcrypt from 'bcrypt';
import config from '../app/config';

const userSchema = new Schema<TUser>({
    userId: {
        type: Number,
        required: [true, "user id is required and must be unique"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "user name is required and must be unique"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        maxlength: [20, "password can not be more than 20 characters"]
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, "first name is required"]
        },
        lastName: {
            type: String,
            required: [true, "last name is required"]
        }
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    hobbies: {
        type: [String],
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    },
    orders: [{
        productName: {
            type: String,
            // required: true
        },
        price: {
            type: Number,
            // required: true
        },
        quantity: {
            type: Number,
            // required: true
        },
    }]
})

// pre save middleware
userSchema.pre('save', async function (next) {
    const user = this;
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// post save middleware
// userSchema.post('save', function (doc, next) {
//     doc.password = '';
//     next();
// });

//creating a custom static method
userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId });
    return existingUser;
};

const User = model<TUser, userModel>('User', userSchema);

export default User;