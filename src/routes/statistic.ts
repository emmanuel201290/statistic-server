import { Router } from 'express';
import { check } from 'express-validator';
import { create, getStatisticByCountry, updateStaticByCountry, findStatistic } from '../controllers/sync';
import { createUser, login } from '../controllers/user';
import validateField from '../database/ValidateField';
import { emailExist } from '../helpers/db-validators';
import { verifyToken } from '../middlewares/autentication';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     jwt:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: "object"
 *       properties:
 *         email:
 *           type: "string"
 *           description: "email is defined as user"
 *         password:
 *           type: "string"
 *           description: "password must be less 6 character"
 *     Statistic:
 *       type: "object"
 *       properties:
 *         continent:
 *           type: "string"
 *         country:
 *           type: "string"
 *         population:
 *           type: "string"
 *         cases:
 *           type: "object"
 *           properties:
 *             newer:
 *               type: "string"
 *             active:
 *               type: "integer"
 *               format: "int64"
 *             critical:
 *               type: "integer"
 *               format: "int64"
 *             recovered:
 *               type: "integer"
 *               format: "int64"
 *             M_pop:
 *               type: "string"
 *         deaths:
 *           type: "object"
 *           properties:
 *             newer:
 *               type: "string"
 *             M_pop:
 *               type: "string"
 *             total:
 *               type: "integer"
 *               format: "int64"
 *         tests:
 *           type: "object"
 *           properties:
 *             M_pop:
 *               type: "string"
 *             total:
 *               type: "integer"
 *               format: "int64"
 *   errorResponse:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *       message:
 *         type: string
 *   AuthResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Success message
 *       accessToken:
 *         type: string
 *         description: Access token
 *       userInfo:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               descrition: User ID.
 *             email:
 *               type: string
 *               description: User email
 */

router.post('/', verifyToken, create);

/**
 * @swagger
 * /getAll:
 *   get:
 *     tags:
 *      - "Statistic"
 *     summary: "Return all statistic about Covi 19"
 *     description: "To get the token, you need login with an existing account or create a new account"
 *     operationId: /getAll
 *     parameters:
 *       - name: token
 *         in: "header"
 *         description: "token must to be passed in the header"
 *         required: true
 *         type: "string"
 *         minimum: 1.0
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: return all statistic about countries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: "string"
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y
 *       401:
 *         description: Token invalid
 *
 *     security:
 *       - jwt: []
 */
router.get('/getAll', verifyToken, findStatistic);

/**
 * @swagger
 * /getByCountry/{country}:
 *   get:
 *     tags:
 *     -  "Statistic"
 *     summary: Get statistic of covid 19 by country
 *     operationId: getByCountry
 *     parameters:
 *     -  name: country
 *        in: path
 *        description: Country name that we want to find
 *     -  name: token
 *        in: header
 *        description: token to be passed as a header
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Country was found
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: "string"
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y
 *     
 *     security:
 *     - jwt: []
 */
router.get('/getByCountry/:country', verifyToken, getStatisticByCountry);

/**
 * @swagger
 * /update/{id}:
 *   post:
 *     tags:
 *     -  "Statistic"
 *     summary: Update record pass id 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Statistic' 
 *     comsumes: 
 *     - "aplication/json"
 *     produces: 
 *     - "application/json"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: User id
 *         required: true 
 *         format: "int64" 
 *         example: "5eb12e197e06a76ccdefc121"
 *       - name: newer
 *         in: "formData"
 *         required: false
 *         description: "Update newer of cases"
 *       -  name: token
 *          in: header
 *          description: token to be passed as a header
 *          required: true
 *          type: string 
 *     responses:
 *       "405":
 *         description: "invalid input" 
 *     security:
 *     - jwt: [] 
 */
router.post('/update/:id', verifyToken, updateStaticByCountry);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *     - "User"
 *     summary: User must be previously registered for login .
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Log in success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: User not found
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/errorResponse'
 *
 */
router.post('/login/', login);

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "Let create a user using parameter of schema (email, password)"
 *     description: ""
 *
 *     consumes:
 *     - "application/json"
 *
 *     produces:
 *     - "application/json"
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User has been register successfuly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post(
  '/signup',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email').isEmail(),
    check('email', 'The user must be email format').custom(emailExist),
    check('password', 'Password must have 6 mimimum character').isLength({ min: 6 }),
    validateField,
  ],
  createUser
);

export default router;
