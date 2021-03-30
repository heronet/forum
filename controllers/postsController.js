const User = require("../models/User");
const Post = require("../models/Post");

exports.createPost = async (req, res, next) => {
    try {
        // Decrypted token was set in verify-token middleware
        const user = await User.findById(req.decryptedToken.userId);
        // Cerate a post only if a user was found i.e. the token was valid
        if(user) {
            const post = new Post({
                title: req.body.title,
                content: req.body.content
            });
            const createdPost = await Post.create(post);
            res.status(201).json(createdPost);
        } else {
            res.status(401).json({success: false, message: "Access denied"});
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, error: error.message});
    }
}