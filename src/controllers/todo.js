const { response } = require("express");
const Todos = require("../models/Todos");

const createTodo = async (req, resp = response) => {
    const todo = new Todos(req.body);
    try {
        const newTodo = await todo.save()
        resp.status(200).json({
            ok: true,
            newTodo
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            error
        })
    }
};

const getTodos = async (req, resp = response) => {
    const todos = await Todos.find().populate();
    try {
        resp.status(200).json({
            ok: true,
            todos,
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: true,
            msg: "Hubo un error"
        })
    }
};

const deleteTodo = async (req, resp = response) => {
    const todoId = req.params.id;
    try {
        const todoItem = await Todos.findById(todoId);
        await Todos.findByIdAndDelete(todoId);
        resp.json({
            ok: true,
            msg: `El elemento de id ${todoId} ha sido eliminado`
        })

    } catch (error) {
        console.log(error);
        resp.status(404).json({
            ok: true,
            msg: "No se pudo eliminar este elemento"
        })
    }
}

module.exports = {
    createTodo,
    getTodos,
    deleteTodo
};