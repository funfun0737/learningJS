const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static('./public'));

const people = {
    "fun":{
        "age":26,
    },
    "bam":{
        "age":26,
    }
};


app.get('/people/', (req, res) => {
    res.json(Object.keys(people));
})

app.get('/people/:name', (req, res) => {
    const name = req.params.name;
    if(people[name]) {
        res.json(people[name]);
    } else {
        res.status(404).json({error:`unknown user: ${name}`});
    }
})

app.post('/people/:name', express.json(),(req, res) => {
    const name = req.params.name;
    if (!name) {
        res.status(400).json({error: "missing-name"});
    } else if (people[name]) {
        res.status(409).json({error:"duplicate"});
    } else {
        people[name] = {"age":80};
        res.sendStatus(200);
    }
})

app.delete('/people/:name-removes',(req, res) => {
    const name = req.params.name;
    if (!name) {
        res.status(400).json({error: "missing-name"});
    } else {
        res.redirect('/people');
    }
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
