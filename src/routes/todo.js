const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validateFields');
const { createTodo } = require('../controllers/todo');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();
/*
    Rutas de TODO
    host + /api/todo
*/

router.use(validarJWT);

router.post('/create',
    [
        check('task', 'La tarea es obligatoria').not().isEmpty(),
        validateField
    ],
    createTodo,
);


module.exports = router;