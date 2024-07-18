let posts = [
  {
    id: 1,
    title: "Sports",
  },
  {
    id: 2,
    title: "Business",
  },
];

// @des     get all the posts
// @url     GET /api/posts
// @access  NA
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  if (!posts) {
    const err = new Error(`No posts found`);
    err.status = 400;
    return next(err);
  }
  res.status(200).json(posts);
};

// @des     get single post
// @url     GET /api/posts/:id
// @access  NA
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);
  if (!post) {
    const err = new Error(`No post found`);
    err.status = 400;
    return next(err);
  }
  res.status(200).json(post);
};

// @des     create single post
// @url     GET /api/posts
// @access  NA
export const createPost = (req, res, next) => {
  if (!req.body.title) {
    const err = new Error(`No input data.....Try again`);
    err.status = 400;
    return next(err);
  }

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  posts.push(newPost);
  res.status(201).json(posts);
};

// @des     edit single post
// @url     GET /api/posts/:id
// @access  NA
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);
  // console.log(post);
  if (!post) {
    // console.log(" ");
    const err = new Error("Can't Update");
    err.status = 400;
    return next(err);
  }
  post.title = req.body.title;
  res.status(200).json(posts);
};

// @des     delete single post
// @url     GET /api/posts/:id
// @access  NA
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const post = posts.find((post) => {
    return post.id === id;
  });
  console.log(post);
  if (!post) {
    // console.log("Unable to delete");

    const err = new Error("Unable to delete");
    err.status = 400;
    return next(err);
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};
