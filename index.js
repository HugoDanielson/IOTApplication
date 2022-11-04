const dontenv = require('dotenv');
const express = require("express");
const mongoose = require("mongoose");
const app = express();


//Variables
const port = process.env.PORT || 3500;
//Models
const TodoTask = require("./models/TodoTask");


dontenv.config();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));


//Connection to db
//mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
});




//view engine config
app.set("view engine", "ejs");

// GET METHOD
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });
});

//POST METHOD
app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

//EDIT METHOD
app.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
}).post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});
