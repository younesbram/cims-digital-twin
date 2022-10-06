const express = require('express')
const app = express()
const port = 3000
const path = require('path');
let reqpath = path.join(__dirname, "../");
app.use(express.static(reqpath));

app.get('/', (req, res) => {
  res.sendFile('index.html', reqpath);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})