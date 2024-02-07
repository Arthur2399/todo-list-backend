const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewares/validateFields');
const { userCreate, userLogin, neNewToken } = require('../controllers/auth');

const router = Router();
/*
    Rutas de Usuarios / Auth 
    host + /api/auth 
*/

router.post('/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Ingrese un email válido').isEmail(),
        check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
        validateField
    ],
    userCreate);

router.post('/',
    [
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'Ingrese un email válido').isEmail(),
        validateField
    ],
    userLogin);

router.get('/renew', neNewToken);

module.exports = router;