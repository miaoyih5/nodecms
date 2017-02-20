/**
 * Created by LISHI on 2017/1/30.
 */


const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
const fs = require('fs');
const bluebird = require('bluebird');

const loadModels = function(path) {

    fs.readdirSync(path).forEach((file) => {
        let newPath = path + '/' + file;
        let stat = fs.statSync(newPath);

        if (stat.isFile()) {
            if (/(.*)\.js/.test(file)) {
                require(newPath)
            }
        } else if (stat.isDirectory()) {
            loadModels(newPath)
        }
    })

}

module.exports = function() {
    mongoose.connect(config.mongo.uri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(callback) {
        console.log("连接数据库成功")
    });

    let modelsPath = path.join(__dirname, '../models');
    loadModels(modelsPath)

    // fs.readdirSync(modelsPath).forEach(function(file) {
    //     if (/(.*)\.(js$|coffee$)/.test(file)) {
    //         require(modelsPath + '/' + file);
    //     }
    // });

}
