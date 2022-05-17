const express = require('express')
const app = express()
const port = 8080

const maria = require('mysql')
const db_config = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'priconne'
};
const conn = maria.createConnection(db_config);
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index.ejs');
    var ip_addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip_addr);
})

app.get('/submit', (req, res)=>{
    res.render('submit.ejs');
})

conn.connect();
app.post('/add', (req, res)=>{
    //console.log(typeof(req.body.s10[0]));
    let s10 = req.body.s10;
    let s8 = req.body.s8;
    let s7 = req.body.s7;
    let m1 = req.body.m1;
    let m2 = req.body.m2;
    let m3 = req.body.m3;
    let update_s10 = 'update princess set score = score+10, s10 = s10+1 where name ="';
    let update_s8 = 'update princess set score = score+8, s8 = s8+1 where name ="';
    let update_s7 = 'update princess set score = score+7, s7 = s7+1 where name ="';
    let update_m1 = 'update princess set score = score-1, ms1 = ms1+1 where name ="';
    let update_m2 = 'update princess set score = score-2, ms2 = ms2+1 where name ="';
    let update_m3 = 'update princess set score = score-3, ms3 = ms3+1 where name ="';
    
    for(let i = 0; i < s10.length; i++){
        conn.query(update_s10 + s10[i] + '"', (err, rows, fields)=>{
            if(err) console.log(err);
        })
    }
    for(let i = 0; i < s8.length; i++){
        conn.query(update_s8 + s8[i] + '"', (err, rows, fields)=>{
            if(err) console.log(err);
        })
    }
    for(let i = 0; i < s7.length; i++){
        conn.query(update_s7 + s7[i] + '"', (err, rows, fields)=>{
            if(err) console.log(err);
        })
    }
    for(let i = 0; i < m1.length; i++){
        conn.query(update_m1 + m1[i] + '"', (err, rows, fields)=>{
            if(err) console.log(err);
        })
    }
    for(let i = 0; i < m2.length; i++){
        conn.query(update_m2 + m2[i] + '"', (err, rows, fields)=>{
            if(err) console.log(err);
        })
    }
    for(let i = 0; i < m3.length; i++){
        conn.query(update_m3 + m3[i] + '"', (err, rows, fields)=>{
            if(err) console.log(err);
        })
    }
    res.send("제출 완료");
})

app.get('/result', (req, res)=>{
    conn.query('select * from princess order by score desc', (err, rows, fields)=>{
        if(!err){
            res.render('result.ejs', {result: rows});
        }
        else{
            console.log(err);
            res.json({"err": err});
            conn.end();
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})