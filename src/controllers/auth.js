const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');

const userCreate = async (req, res = response) => {
    const { email, password } = req.body;
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
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Por favor hable con el administrador',
        });
    }

}

const userLogin = (req, res = response) => {
    const { email, password } = req.body
    res.status(200).json({
        ok: true,
        msg: 'Ingreso exitoso'
    })
}

const neNewToken = (req, res = response) => {
    const { token } = req.body
    res.json({
        ok: true,
        msg: 'Verify token'
    });
}

module.exports = {
    userCreate,
    userLogin,
    neNewToken,
}