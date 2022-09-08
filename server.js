
/* JavaScript empty object to represent the endpoint of routes */

let projectData = {};

//  At the Terminal 
// 1- npm init -y  ---> show the dependences we use in this app in package.json
// 2- npm install express 
// 3- npm install cors 
// 4- npm install body-parser
// 5- node server.js ------------------> to run the server
// 6- nodemon server.js ------------------> to run the server permanently


/* Express to run server and routes */
const express = require('express');

/* app is an instance of express framework  */
const app = express();

// we want to parse the json  that comes from client---> using body-parser
// use is used to make middleware function between request and response 

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false })); //extended ---> false  that means that we want to handle only simple data related to json  
app.use(bodyParser.json());

/* website folder is a static folder that contains (html , css, js) files*/
app.use(express.static('demo-website'));

//cross origin allawnce ---> allow any External http request
const cors = require('cors');
app.use(cors());

app.post('/add', async (req, res) => {
    const info = {
        Current_Temprature: req.body.Current_Temprature,
        Current_Date: req.body.newDate,
        User_Feelings_output: req.body.User_Feelings_output
    };

    projectData = info;
});


app.get("/all", async (req, res) => {
    if (projectData) {
        res.send(projectData);
    }
});


const port = 3000;
/* Spin up the server and listen from specific port then do what function wants it to do */
const server = app.listen(port, listening);
function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};
/*
//recieve daata here
app.post('/add', callBack);

async function callBack(req, res) {

    const data_content = await req.body;
    projectData.push(data_content);
    console.log(projectData);
    res.status(200).send(projectData);
};
*/


