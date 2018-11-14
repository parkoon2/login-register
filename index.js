const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const mongoURI = 'mongodb://localhost:27017/parkoonlogin'

mongoose
.connect(mongoURI, {useNewUrlParser: true})
.then(() => console.log('MongoDB is running'))
.catch(err => console.log(err))

// app.use('/users', )

app.listen(port, () => {
    console.log(`Server is running on ${port} port`)
})