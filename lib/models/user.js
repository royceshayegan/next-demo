import mongoose, {Schema, models} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    preferredTheme: {
        type: String,
        required: true,
    },
    tasks: {
        type: Array,
        required: false,
    }
}, {timestamps: true});

const User = models.User || mongoose.model("User", userSchema);

export default User;