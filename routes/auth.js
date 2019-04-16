const express = require('express');
const AuthController = require('../controllers/auth');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     description: Registers users to the platform.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: Full name of user.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful registration, use the token for the actions that need authentication
 *       400:
 *         description: input validation error or already registered email
 */

router.post('/register', async (req, res) => { await AuthController.register(req, res); });

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Logs users into the platform. To Log out, simply delete the token in client side
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful login, use the token for the actions that need authentication
 *       400:
 *         description: input validation error or invalid auth data
 */

router.post('/login', async (req, res) => { await AuthController.login(req, res); });


module.exports = router;
