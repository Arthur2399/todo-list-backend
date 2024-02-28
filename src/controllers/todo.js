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


module.exports = {
    createTodo,
};