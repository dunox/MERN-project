const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const router = Router();


//  /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password should contain from 6 to 12 characters')
        .isLength({ min: 6, max: 12 })
    ],
    async (req, res) => {
    try {
        console.log('Body', req.body)
        const errors = validationResult(req);

        if( !errors.isEmpty() ) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Not valid register data'
            });
        };

        const { email, password } = req.body;

        const candidate = await User.findOne({ email: email });
        if ( candidate ) {
            res.status(400).json({ message: "User with such email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword});

        await user.save();

        res.status(201).json('User successfully created');


    } catch (e) {
        res.status(200).json({message: "Something went wrong, please try again"});
    }
});

//  /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Please type in valid email').normalizeEmail().isEmail(),
        check('password', 'Please type in your pasword').exists()
    ], 
    async (req, res) => {
    try {

        const errors = validationResult(req);

        if( !errors.isEmpty ) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Not valid authorization data'
            });
        };

        const { email, password } = req.body;
        
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'User with such email doesn\'t exist'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({message: 'Wrong password please try again'});
        }
        
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecretKey'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id})

        

    } catch (e) {
        res.status(500).json({message: "Something went wrong, please try again"});
    }
});

module.exports = router;