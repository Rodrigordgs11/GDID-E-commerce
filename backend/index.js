const express = require('express');

const app = express();

app.get("/", function(req, res) {
    return res.send("Hello World - E-commerce!!!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend E-commerce running on port ${PORT}`));