'use strict'

const messages = require('../modules/messages')

const databaseData = {
    host: 'sql2.freemysqlhosting.net',
    user: 'sql2261741',
    password: 'zR9%aE1*',
    database: 'sql2261741',
    port: 3306
}

const testBody = {
    body : {
        id: 9999,
        formName: 'John Doe',
        formEmail: 'JohnDoe@coventry.co.uk',
        formSite: 'http://JohnDoe.co.uk',
        formMessage: 'Hello, i\m John Doe'
    },
}

const testBodyString = JSON.stringify(testBody)

describe('add', () => {
    afterEach( () => messages.deleteById(databaseData, {params: {id: 9999}}, function (err, data) {
        if (err) console.error('Error cleaning up: ' + err)
    }))

    test ('add one item to db', () => {
        expect.assertions(1)
        let dataReceived = ''
        messages.add(databaseData, testBody, function (err, data) {
            if (err) console.error(err)
            let someData = messages.getById(databaseData, testBody, function (err, data) {
                if (err) console.error(err)
                callback(data)
            })
            console.log(someData)
        })
        expect(testBodyString).toBe(dataReceived)
    })
})