const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
const { faker } = require('@faker-js/faker');

const app = express();
const port = 8090;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
///hello my name is eklas
let posts = [
    {
        id: uuidv4(),
        username: "Albert Einstein",
        content: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Steve Jobs",
        content: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Maya Angelou",
        content: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Walt Disney",
        content: "All our dreams can come true, if we have the courage to pursue them.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Nelson Mandela",
        content: "Education is the most powerful weapon which you can use to change the world.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Martin Luther King Jr.",
        content: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Abraham Lincoln",
        content: "Whatever you are, be a good one.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Oprah Winfrey",
        content: "The biggest adventure you can take is to live the life of your dreams.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Mark Twain",
        content: "The two most important days in your life are the day you are born and the day you find out why.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Rosa Parks",
        content: "You must never be fearful about what you are doing when it is right.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Stephen Hawking",
        content: "Remember to look up at the stars and not down at your feet. Try to make sense of what you see and wonder about what makes the universe exist. Be curious.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Mahatma Gandhi",
        content: "The best way to find yourself is to lose yourself in the service of others.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Helen Keller",
        content: "The only thing worse than being blind is having sight but no vision.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Leonardo da Vinci",
        content: "Learning never exhausts the mind.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Winston Churchill",
        content: "Success consists of going from failure to failure without loss of enthusiasm.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Marie Curie",
        content: "Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves. We must believe that we are gifted for something and that this thing must be attained.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Vincent Van Gogh",
        content: "I am seeking, I am striving, I am in it with all my heart.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Mother Teresa",
        content: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Elon Musk",
        content: "When something is important enough, you do it even if the odds are not in your favor.",
        time: faker.date.recent(),
    },
    {
        id: uuidv4(),
        username: "Socrates",
        content: "The only true wisdom is in knowing you know nothing.",
        time: faker.date.recent(),
    }
];

app.get("/",(req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
function getFormattedTime() {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedTime = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;

    return formattedTime;
}
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const newId = uuidv4();
    const time=getFormattedTime();
    posts.push({ id: newId, username, content ,time});
    res.redirect('/posts');
});


app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    if (post) {
        res.render("show.ejs", { post,posts });
    } else {
        res.status(404).send("Post not found");
    }
});

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = posts.find((p) => id === p.id);
    if (post) {
        post.content = content;
        res.redirect('/posts');
    } else {
        res.status(404).send("Post not found");
    }
});

app.delete("/posts/:id",(req,res)=>{
    const{id}= req.params;
    posts=posts.filter((p)=> id!== p.id);
    res.redirect("/posts")
})

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
