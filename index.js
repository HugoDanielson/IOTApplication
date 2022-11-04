const express = require("express");
const app = express();


//Binds static to folder public. Index then is served with a static web app template from there.
app.use("/static", express.static("public"));

//view engine config

app.set("view engine", "ejs");

app.get('/', (req, res) => {

    res.render('todo.ejs');
});

app.listen(3000, () => {

    console.log("Server Up and running");

});



