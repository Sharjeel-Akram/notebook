const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    obj = {
        a: 'Sharjeel',
        num: 4
    }
    res.json(obj)
})

module.exports = router