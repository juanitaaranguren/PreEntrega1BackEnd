const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createHash } = require('../../utils');
const passport = require("passport");
const jwt = require("jsonwebtoken");


router.post('/register', passport.authenticate("register", { failureRedirect: "/failregister" }), async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('Faltan datos.');
    }

    const hashedPassword = createHash(password);

    const user = await User.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword
    });

    console.log('Usuario registrado con éxito:', user);
    res.redirect('/login');
});


router.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    if (email == "adminCoder@coder.com" && password == "adminCod3r123") {
        let token = jwt.sign({ email, password }, "coderSecret", { expiresIn: "24h" });
        res.cookie("coderCookieToken", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        });
        res.send({ message: "Logueado existosamente" });
    } else {
        res.redirect('/faillogin');
    }
});


router.get("/login", async (req, res) => {
    res.render("login");
});

router.get("/register", async (req, res) => {
    res.render("register");
});

router.get("/profile", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("login");
    }

    const { first_name, last_name, email, age } = req.session.user;
    res.render("profile", { first_name, last_name, age, email });
});

router.get("/failregister", async (req, res) => {
    console.log("Falla en autenticación");
    res.send({ error: "Falla" });
});

router.get("/logout", async (req, res) => {
    delete req.session.user;
    res.redirect("login");
});


module.exports = router;
