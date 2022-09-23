const express = require('express');
const Post = require('../../Domain/models/Post')


const get = async (req, res = express.response) => {
    try {
        const posts = await Post.find();

        if (posts.length > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Posts retrieved successfuly!.',
                data: posts
            });
        }

        return res.status(400).json({
            ok: false,
            message: 'Inexistent posts.'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            error: 'Error! - Try again please.'
        });
    }
}

const getUserPosts = async (req, res = express.response) => {
    try {
        let posts = null;
        const user_id = req.params.user_id;

        if (Object.entries(req.query).length > 0) {
            const postTile = req.query.title;
            posts = await Post.find({ $and: [{ user_id: user_id, title: { $regex: postTile, $options: "i" } }] });
        } else {
            posts = await Post.find({ user_id });
        }

        if (posts.length > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Posts retrieved successfuly!.',
                data: posts
            });
        }

        return res.status(404).json({
            ok: false,
            message: 'You haven\'t posts.'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            error: 'Error! - Try again please.'
        });
    }
}

const store = async (req, res = express.response) => {
    const { title } = req.body;

    try {

        let post = await Post.findOne({ title })

        if (post) {
            return res.status(400).json({
                ok: false,
                message: 'Post with the same title already exists.'
            });
        }

        post = new Post(req.body)
        await post.save();

        return res.status(201).json({
            ok: true,
            message: 'Post created successfuly!.',
            data: post
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            error: 'Error! - Try again please.'
        });
    }
}

module.exports = { store, get, getUserPosts }