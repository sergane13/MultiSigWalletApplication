import express from "express"
import fs from "fs"

const app = express();

app.use(express.static(__dirname)) //name of the directory

const path:string = "./backend-application/controllers/main.html"

const file = fs.readFileSync(path, 'utf-8')

app.get('/', (req, res) => 
{
    // console.log("da da")
    res.send(file)
})


app.listen(8080, () => 
{
    console.log("server working on port 8080")
})