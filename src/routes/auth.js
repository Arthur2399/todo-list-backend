const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewares/validateFields');
const { userCreate, userLogin, neNewToken } = require('../controllers/auth');

const router = Router();


/*
    Rutas de Autentificación 
    host + /api/auth 
*/


//Resgistrar usuarios
router.post('/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'Ingrese un email válido').isEmail(),
        check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
        validateField
    ],
    userCreate);

//Authenticar usuarios
router.post('/',
    [
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'Ingrese un email válido').isEmail(),
        validateField
    ],
    userLogin);

//Renovar token
router.get('/renew', neNewToken);


module.exports = router;