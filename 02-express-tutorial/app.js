const express = require('express')
const path = require('path')
const data = require('./data')

const logger = require('./logger')

const app = express()

// setup static and middleware
app.use(express.static('./public'))

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
//   adding to static assets
//   SSR
// })

app.get('/json', (req, res) => {
    const obj = {
        param: 123,
        dat: new Date(),
        str: "asdfasfasfasf"
    };
    logger.info('json request received', obj);
    res.json(data.products);
})

app.get('/error', (req, res) => {
    logger.info('error request received', req.query);
    try {
        if(res.asdfasda.asdfasd === 'asdasdf') {
            res.json(data.products);
        }
    } catch (error) {
        const obj = {
            param: 123,
            dat: new Date(),
            str: "asdfasfasfasf"
        };
        logger.error('kurde...', error);
        res.status(500).send('error');
    }
})

app.all('*', (req, res) => {
    res.status(404).send('resource not found')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000....')
})
