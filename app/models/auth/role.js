/**
 * Created by LISHI on 2017/2/1.
 */
/**
 * Created by LISHI on 2017/2/1.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


var RoleSchema = new Schema({
    name:{
      type:String,
      default:''
    },
    auth:[{
      type:ObjectId,
      ref:'Auth'
    }]
})



RoleSchema.set('toObject', { virtuals: true });

mongoose.model('Role', RoleSchema)
