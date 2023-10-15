import mongoose, {Schema, models} from 'mongoose';

const taskSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Task = models.Task || mongoose.model("Task", taskSchema);

export default Task;