import express from "express";

const router = express.Router();

let posts=[
    {
        id:1,
        title:'Sports',
    },
    {
        id:2,
        title:"Business",
    }
]


router.get("/",(req,res,next)=>{

    const limit = parseInt(req.query.limit);
    console.log(limit);
if(!isNaN(limit) && limit>0){
    res.status(200).json(posts.splice(0,limit));
}
    if(!posts){
        const err = new Error(`No posts found`);
        err.status = 400;
        return next(err);
    }
    res.status(200).json(posts);
})

router.get('/:id',(req,res,next)=>{
    const id = parseInt(req.params.id);
    
    const post = posts.find((post)=>post.id === id);
    if(!post){
        const err = new Error(`No post found`);
        err.status=400;
        return next(err);
    }
    res.status(200).json(post);
})

router.post('/',(req,res,next)=>{
    if(!req.body.title){
        const err = new Error(`No input data.....Try again`);
        err.status = 400;
        return next(err);
    }

    const newPost={
        id: posts.length+1,
        title: req.body.title
    }
    posts.push(newPost);
    res.status(201).json(posts);
})

//for updating
router.put('/:id',(req,res,next)=>{
    const id = parseInt(req.params.id);
    
    const post= posts.find((post)=>
        post.id===id
    )
    // console.log(post);
    if(!post){
        // console.log(" ");
        const err = new Error ("Can't Update");
        err.status = 400;
        return next(err);
    }
    post.title=req.body.title;
    res.status(200).json(posts);
})

//for deleting
router.delete("/:id",(req,res,next)=>{
    const id = parseInt(req.params.id);
    console.log(id);
    const post = posts.find((post)=>{
       return post.id === id
    })
    console.log(post);
    if(!post){
        // console.log("Unable to delete");
        
        const err = new Error ("Unable to delete");
        err.status = 400;
        return next(err);
    }
    posts = posts.filter((post)=>post.id!==id);
    res.status(200).json(posts);
})

export default router;