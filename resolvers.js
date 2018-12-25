import Recipe from './models/Recipe';
import User from './models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createToken = (user, secret, expiresIn) => {
    const { userName, email } = user;
    return jwt.sign({ userName, email }, secret, { expiresIn })
}

const getCurrentUser = async (token) => {
    if (token !== null) {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            return currentUser;
        }
        catch (err) {
            console.error(err);
        }
    }
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args) => {
            const allRecipes = await Recipe
                .find()
                .sort({ createDate: 'desc' })
                .exec();
            return allRecipes;
        },
        getRecipe: async (root, { _id }, { models }) => {

            const recipe = await models.Recipe.findOne({ _id });
            if (!recipe) {
                throw new Error('User not found');
            }
            return recipe;
        },

        getCurrentUSer: async (root, args, { token }) => {
            const currentUser = await getCurrentUser(token);
            if (!currentUser) {
                return null
            }
            const user = await User.findOne({
                userName: currentUser.userName
            }).populate({
                path: "favorites",
                model: "Recipe"
            });
            return user;
        },
        getUserRecipes: async (root, { userName }) => {
            const userRecipes = await Recipe.find({ userName }).sort({
                createdDate: "desc"
            });
            return userRecipes;
        },
        searchRecipes: async (root, { searchItem }) => {
            if (searchItem) {
                const searchResults = await Recipe.find({
                    $text: { $search: searchItem }
                }, {
                        score: { $meta: "textScore" }
                    }).sort({
                        score: { $meta: "textScore" }
                    });
                return searchResults;
            }
            else {
                const recipes = await Recipe.find().sort({ likes: 'desc', createDate: 'desc' });
                return recipes;
            }
        }
    },
    Mutation: {
        addRecipe: async (root, { input: { name, description, category, instruction, userName } }) => {
            const newRecipe = await new Recipe({
                name,
                description,
                category,
                instruction,
                userName
            }).save();
            return newRecipe;
        },

        signupUser: async (root, { input: { userName, password, email } }) => {
            const user = await User.findOne({ userName });
            if (user) {
                return { message: 'Auth fail' }
            }
            const newUser = await new User({
                userName,
                email,
                password
            }).save();
            const token = createToken(newUser, process.env.SECRET, '1h');
            console.log('token', token);
            return { token: createToken(newUser, process.env.SECRET, '1h') }
        },
        likeRecipe: async (root, { _id, userName }) => {
            const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
            const user = await User.findOneAndUpdate({ userName }, { $addToSet: { favorites: _id } })
            return recipe;
        },
        unLikeRecipe: async (root, { _id, userName }) => {
            const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
            const user = await User.findOneAndUpdate({ userName }, { $pull: { favorites: _id } })
            return recipe;
        },
        signinUser: async (root, { input: { userName, password, email } }, { token }) => {
            const user = await User.findOne({ userName });
            if (!user) {
                throw new Error('User not found');
            }
            const isValidPAssword = await bcrypt.compare(password, user.password)
            const isValidEmail = email === user.email
            if (!isValidPAssword || !isValidEmail) {
                throw new Error('Invalid');
            }
            return { token: createToken(user, process.env.SECRET, '1h') }
        },
        deleteUserRecipe: async (_, { _id }) => {
            const recipe = await Recipe.findOneAndDelete({ _id });
            return recipe;
        }
    }
};