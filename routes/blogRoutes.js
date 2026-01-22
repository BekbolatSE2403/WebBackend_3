const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// post blog(create a blog)
router.post('/', async (req, res) => {
    try {
        const { title, body, author } = req.body;
        
        // Validation
        if (!title || !body) {
            return res.status(400).json({
                error: "Title and body are required"
            });
        }
        
        const blog = new Blog({ title, body, author });
        await blog.save();
        
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get blogs(gets all the blogs)
router.get('/', async (req, res) => {
    try {
        const blog = await Blog.find().sort({createdAt: -1});

        res.json(blog);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//get blogs by id
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if(!blog) {
            return res.status(404).json({error: "Blog not found"});
        }

        res.json(blog)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//put blogs(with id) update
router.put('/:id', async (req, res) => {
    try {
        const {title, body, author} = req.body;

        //validation
        if(!title || !body) {
            return res.status(400).json({error: "Title and body is required"});
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            {title, body, author},
            {new: true, runValidators: true}
        );

        if(!blog) {
            return res.status(404).json({error: "Blog not found"});
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//delete blog by id
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if(!blog) {
            return res.status(404).json({error: "Blog is not found"});
        }

        res.json({message: "Deleted"})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;