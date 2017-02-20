/**
 * Created by LISHI on 2017/1/30.
 */
/**
 * Created by LISHI on 2017/2/1.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jwt-simple')
const crypto = require('crypto')
const config = require('../../config/config')
const moment = require('moment')

const UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    hashedPassword: {
        type: String,
        default: ''
    },
    email:{
      type:String,
      default:''
    },
    sex:{
      // 1大代表男，2代表女
      type:Number,
      default:1
    },
    phone:{
      type:String,
      default:''
    },
    address:{
      type:String,
      default:''
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 0
    }
})


UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

UserSchema
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
    }, '这个呢称已经被使用.');


UserSchema.methods = {
    md5Password: function(password) {
        let md5 = crypto.createHash('md5'); //定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
        md5.update(password);
        let d = md5.digest('hex'); //加密后的值d
        this.hashedPassword = d;
    },
    validPassword: function(password) {
        let md5 = crypto.createHash('md5'); //定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
        md5.update(password);
        let d = md5.digest('hex'); //加密后的值d
        return this.hashedPassword === d;
    },

    generateJwt: function() {
        let expires = moment().add('days', 7).valueOf();
        let token = jwt.encode({
            iss: this._id,
            exp: expires
        }, config.jwt);

        return {
            token: token,
            expires: expires,
            user: this._id
        }


    }
}




mongoose.model('User', UserSchema);
