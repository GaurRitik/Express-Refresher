const getPostBtn = document.querySelector('#get-the-posts');
const output = document.querySelector('#output');
const form = document.querySelector('#submit-post')

const getAllPosts = async()=>{
    try{
        const res = await fetch("http://localhost:8000/api/posts");
        if(!res.ok){
            throw new Error("Failed to fetch the data");
        }
        
        const posts = await res.json();
        console.log("posts: ",posts);
        output.innerHTML="";
    
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.textContent= post.title;
            output.appendChild(postElement);
        });
    }
    catch(err){
        console.error("Error in fetching the posts: ",err);
    }
}

//add post
const addPost = async(e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    console.log(`Form Data: ${JSON.stringify(formData)}`)
    try{
        const res = await fetch("http://localhost:8000/api/posts",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({title})
        });
        console.log(title);
        if(!res.ok){
            throw new Error("Failed to add a post");
        }

        const newPost = await res.json();

        //to add new post to the UI
        const postElement = document.createElement('div');
        postElement.textContent = newPost.title;
        output.appendChild(postElement);
        getAllPosts();
    }catch(err){
        console.error("Error in adding a post: ",err);
    }
}

//event listener
getPostBtn.addEventListener('click',getAllPosts);
form.addEventListener('submit',addPost);