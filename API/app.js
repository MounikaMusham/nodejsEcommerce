const express = require('express');
const app = express();
const cors = require('cors')
const ecommerce = require('./ecommerce/ecommerceRouter');
app.use(express.json());
const corsOptions = {
    methods:'GET,PUT,POST,DELETE',
     origin:'*'
}

app.use(cors(corsOptions))

app.use('/ecommerce',ecommerce);
app.get('*',(req,res)=>{
    res.send({
        key:'404',
        error:'url not found'
    })
})
module.exports = app

// const app = require('./server');

// app.listen(6000, () => {
//   console.log('Server running...');
// });