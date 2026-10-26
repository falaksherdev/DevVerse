import { model, models, Schema } from "mongoose";

export interface IUser {
    _id?: string
    name: string
    username: string
    email: string
    password?: string
    image?: string
    bio?: string
    createdAt?: string
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required "]
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
        },
        image: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
            maxlength: 200,
        },
    },
    { timestamps: true }

)

const User = models.User || model<IUser>("User", UserSchema)

export default User