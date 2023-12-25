const express =require('express');
const mongoose =require("mongoose");
const dotenv =require('dotenv');
const cors=require('cors')
const app = express();

app.use(cors())
const categorieRouter=require("./routes/categorie.route")
const scategorieRouter =require("./routes/scategorie.route")
const articleRouter =require("./routes/article.route")
const userRouter=require('./routes/user.route')
dotenv.config()
app.use(express.json());
// database connection
mongoose.connect(process.env.DATABASECLOUD,{
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {console.log("Successful database connection");
}).catch(err => {
console.log('Connection to the database failed',
err);
process.exit();
});

app.get("/",(req,res)=>{
res.send("It Works!");
});
app.use("/api/categories",categorieRouter)
app.use('/api/scategories', scategorieRouter);
app.use('/api/articles', articleRouter);
app.use('/api/user', userRouter);

app.listen(process.env.PORT, () => {
console.log(`Server is listening on port ${process.env.PORT}`); });
module.exports = app;