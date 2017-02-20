/**
 * Created by LISHI on 2017/1/30.
 */
/**
 * Created by LISHI on 2017/1/30.
 */

// 品牌模型
// 
// 
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const ArticleSchema = new Schema({


    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    },
    time: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    tag: {
        type: ObjectId,
        ref: 'ArticleTag'
    },
    cover: {
        type: String,
        default: ''
    },
    comment: [{
        content: {
            type: String,
            default: ''
        },
        createAt: {
            type: Date,
            default: Date.now
        },
        to: {
            type: String,
            default: ''
        },
        from: {
            type: String,
            default: ''
        }
    }],
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
});

ArticleSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})


// ArticleSchema
//     .path('name')
//     .validate(function(value, respond) {
//         let self = this;
//         this.constructor.findOne({ name: value }, function(err, user) {
//             if (err) throw err;
//             if (user) {
//                 if (self._id === user._id) return respond(true);
//                 return respond(false);
//             }
//             respond(true);
//         });
//     }, '已存在该文章');


ArticleSchema.set('toObject', { virtuals: true });

mongoose.model('Article', ArticleSchema)
