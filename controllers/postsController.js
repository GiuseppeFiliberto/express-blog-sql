// const posts = require('../data/posts')
const connection = require('../data/db')


function index(req, res) {

    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving pizzas from database');
            return;
        }
        console.log(results);

        res.json(results);
    });
}

function show(req, res) {

    const postId = req.params.id

    const sql = 'SELECT * FROM posts WHERE id = ?';

    const sqlJoin = ` 
    SELECT *
    FROM post_tag
    JOIN tags ON post_tag.tag_id = tags.id
    WHERE post_tag.post_id = ${postId}
    `

    connection.query(sql, [postId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving post from database');
            return;
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: '404 not found',
                message: 'post not found'
            })
        }

        const singlePost = results[0];
        console.log(singlePost);

        connection.query(sqlJoin, [postId], (err, tagsResult) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving post tags from database');
                return;
            }
            console.log(tagsResult);

            singlePost.tags = tagsResult
            res.json(singlePost);

        })
    }
    );
}

function store(req, res) {

    // this add a new post 
    const newPost = {
        title: req.body.title,
        slug: req.body.title.toLowerCase().replace(/ /g, '-'),
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    posts.push(newPost);
    console.log(posts);

    res.status(201);
    res.json(newPost);

}

function update(req, res) {

    const slug = req.params.slug

    const singlePost = posts.find(posts => posts.slug === slug)

    if (!singlePost) {
        return res.status(404).json({
            error: '404 not found',
            message: 'post not found'
        })
    }
    // this will update the post selected
    singlePost.title = req.body.title;
    singlePost.slug = req.body.title.toLowerCase().replace(/ /g, '-');
    singlePost.content = req.body.content;
    singlePost.image = req.body.image;
    singlePost.tags = req.body.tags;

    res.json(singlePost);

    console.log(singlePost);

}

function modify(req, res) {

    const slug = req.params.slug

    const singlePost = posts.find(posts => posts.slug === slug)

    if (!singlePost) {
        return res.status(404).json({
            error: '404 not found',
            message: 'post not found'
        })
    }
    // this will update the post selected
    singlePost.title = req.body.title;
    singlePost.slug = req.body.title.toLowerCase().replace(/ /g, '-');
    singlePost.content = req.body.content;
    singlePost.image = req.body.image;
    singlePost.tags = req.body.tags;

    res.json(singlePost);

    console.log(singlePost);

}


function destroy(req, res) {

    const sql = 'DELETE FROM posts WHERE id = ?';

    const postId = Number(req.params.id)

    connection.query(sql, [postId], (err) => {

        if (err) {
            console.error(err);
            res.status(500).json({
                error: 'Database error',
                message: 'Error deleting post from database'
            });
            return;
        }

        res.sendStatus(204);
    });

}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}