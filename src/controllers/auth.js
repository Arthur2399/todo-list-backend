const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const { generarJWT } = require('../helpers/jwt');

const userCreate = async (req, res = response) => {
    const { name, lastName, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });
        }
        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        const token = await generarJWT(user.id, user.name, user.lastName, user.email)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Por favor hable con el administrador',
        });
    }

}

const userLogin = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT
        const token = await generarJWT(user.id, user.name, user.lastName, user.email);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const neNewToken = async (req, res = response) => {
    const { uid, name, lastName, email } = req;
    // Generar JWT
    const token = await generarJWT(uid, name, lastName, email);
    res.json({
        ok: true,
        token,
        uid,
        name,
        lastName,
        email,
    })
}

module.exports = {
    userCreate,
    userLogin,
    neNewToken,
}