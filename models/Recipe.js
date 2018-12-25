import mongoose from 'mongoose';

const RecipesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instruction: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0
    },
    userName: {
        type: String,
    }
})

RecipesSchema.index({
    '$**': 'text'
});

const Recipe = mongoose.model('Recipe', RecipesSchema);

export default Recipe;