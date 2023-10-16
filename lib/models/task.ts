import mongoose, {Schema, models} from 'mongoose';

export const defaultTasks = {
    description: "You have nothing to do.",
    date: "Today",
  };

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