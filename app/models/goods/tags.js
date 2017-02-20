/**
 * Created by LISHI on 2017/1/30.
 */
/**
 * Created by LISHI on 2017/1/30.
 */


const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TagsSchema = new Schema({
	name:{
		type:String,
		unique:true,
		default:''
	}
})

TagsSchema.set('toObject', { virtuals: true });
mongoose.model('Tags',TagsSchema)


