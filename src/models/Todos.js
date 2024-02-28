const { Schema, model } = require("mongoose");

const TodosSchema = Schema({
    task: {
        type: String,
        require: true,
    }
})

module.exports = model('Todo', TodosSchema);