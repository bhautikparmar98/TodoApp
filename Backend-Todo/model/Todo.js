const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//here in mongoose we create product blueprint using Schema instead of constructor
const TodoSchema = Schema({
    name:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Todo',TodoSchema)




// class Product{
//     constructor(id,title,imgUrl,price,description){
//         this.id = id,
//         this.title = title,
//         this.imgUrl = imgUrl,
//         this.price = price,
//         this.description = description
//     }
//     save(){
//         //add product to database
//         products.push(this)
//     }
//     static fetch(){
//         return products
//     }
// }