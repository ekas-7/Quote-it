const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8090;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Ekaspreet Singh Atwal",
        content: "I love coding",
    },
    {
        id: uuidv4(),
        username: "Agamdeep Kaur Atwal",
        content: "I love studying",
    },
    {
        id: uuidv4(),
        username: "Bruce Lee",
        content: "Don't ask GOD for an easy life, ask GOD for the strength to endure a hard one",
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const newId = uuidv4();
    posts.push({ id: newId, username, content });
    res.redirect('/posts');
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id",(req,res)=>{
    const { id }=req.params;
    const newcontent=req.body.content;
    const post = posts.find(p => p.id === id);
    post.content=newcontent;
    res.send("Patch req working");
})

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
