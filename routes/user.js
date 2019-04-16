const express = require('express');
const UserController = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * /api/user/me:
 *   post:
 *     tags:
 *       - User
 *     description: Get user data with token.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: accessToken
 *         description: token to validate user identity
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success, returns data
 *       401:
 *         description: invalid token
 *       404:
 *         description: user not found
 */

router.post('/me', auth, async (req, res) => { await UserController.getUser(req, res); });

/**
 * @swagger
 * /api/user/me:
 *   put:
 *     tags:
 *       - User
 *     description: Updates user data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: accessToken
 *         description: token to validate user identity
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Username to use for login.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: name
 *         description: Full name of user.
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: successful update, returns updated user
 *       400:
 *         description: input validation error
 *       401:
 *         description: invalid token
 *       404:
 *         description: user not found
 */

router.put('/me', auth, async (req, res) => { await UserController.updateUser(req, res); });


module.exports = router;
