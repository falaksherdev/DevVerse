import { Schema, models, model, Types } from "mongoose";


export interface IPost {
    _id?: string
    title: string
    slug: string
    content: string
    excerpt: string
    coverImage?: string
    tags: string[]
    author: Types.ObjectId
    likes: Types.ObjectId[]
    bookmarks: Types.ObjectId[]
    published: boolean
    readingTime: number
    createdAt?: Date;
    updatedAt?: Date;
}

const PostSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: 150,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        excerpt: {
            type: String,
            maxlength: 300,
        },
        coverImage: {
            type: String,
            default: "",
        },
        tags: {
            type: [String],
            default: [],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        bookmarks: [{ type: Schema.Types.ObjectId, ref: "User" }],
        published: {
            type: Boolean,
            default: true,
        },
        readingTime: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

PostSchema.index({ title: "text", content: "text", tags: "text" });

const Post = models.Post || model<IPost>("Post", PostSchema);

export default Post;