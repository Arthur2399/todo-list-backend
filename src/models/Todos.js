const { Schema, model } = require("mongoose");

const TodosSchema = Schema({
    task: {
        type: String,
        require: true,
    }
})

TodosSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Todo', TodosSchema);