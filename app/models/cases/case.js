/**
 * Created by LISHI on 2017/1/30.
 */

// 案例模型
// 
// 
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId  = Schema.Types.ObjectId
const moment = require('moment')

const CaseSchema = new Schema({

    name: {
        type: String,
        unique: true,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    cover: [{
        type: String,
        default: ''
    }],
    love: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    visited: {
        type: Number,
        default: 0
    },
    imgs: [{
        type: String,
        default: ''
    }],
    tags: [{
        type: ObjectId,
        ref:'CaseTag'
    }],
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: Date.now
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    }
})
CaseSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

CaseSchema.path('startTime').get(function (v) {
    console.log(v);
  return moment(v).format();
});
CaseSchema.path('endTime').get(function (v) {
  return moment(v).format();
});
CaseSchema
    .path('name')
    .validate(function(value, respond) {
        let self = this;
        this.constructor.findOne({ name: value }, function(err, user) {
            if (err) throw err;
            if (user) {
                if (self._id === user._id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, '已存在该h5');


CaseSchema.set('toObject', { virtuals: true });
CaseSchema.set('toJSON', { getters: true});

mongoose.model('Case', CaseSchema)
