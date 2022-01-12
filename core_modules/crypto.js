const crypto = require('crypto');

const secret = 'TahsinZilani';
var myKey = crypto.createHmac('sha256',secret)
                .update('i love cupcakes')
                .digest(hex)