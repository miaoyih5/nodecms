/**
 * Created by LISHI on 2017/2/1.
 */
/**
 * Created by LISHI on 2017/2/1.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


var AuthSchema = new Schema({
    name:{
      type:String,
      default:''
    }
})



AuthSchema.set('toObject', { virtuals: true });

mongoose.model('Auth', AuthSchema)
