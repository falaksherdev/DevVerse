import { model, models, Schema, Types } from "mongoose"


export interface IComment {
    _id?: string
    content: string
    post: Types.ObjectId
    author: Types.ObjectId
    parentComment?: Types.ObjectId | null
    likes: Types.ObjectId[]
    createdAt?: Date
    updatedAt?: Date
}

const CommentSchema = new Schema<IComment>(
    {
        content: {
            type: String,
            required: [true, "Comment cannot be empty"],
            trim: true,
            maxlength: 1000,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
            index: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
            index: true
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],

    },
    {
        timestamps: true
    }
)

const Comment = models.Comment || model<IComment>("Comment", CommentSchema)

export default Comment