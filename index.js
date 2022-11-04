const express = require("express")
const app = express()

const port = process.env.PORT || 3500;

app.use("/static", express.static("public"));

//view engine config
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('todo.ejs')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })