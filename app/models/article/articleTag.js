/**
 * Created by LISHI on 2017/1/30.
 */

// 案例模型
// 
// 
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleTagSchema = new Schema({

    name: {
        type: String,
        unique: true,
        default: ''
    },
    pid: {
        type: String,
        default: 0
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
ArticleTagSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})


ArticleTagSchema
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
    }, '已存在该分类');


ArticleTagSchema.set('toObject', { virtuals: true });

mongoose.model('ArticleTag', ArticleTagSchema)
