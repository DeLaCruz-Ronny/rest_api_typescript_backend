import { Router } from "express";
import {
  createProducts,
  deleteProducts,
  getProducts,
  getProductsByID,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 *
 *@swagger
 *components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name
 *                      example: Monitor Curvo
 *                  price:
 *                      type: number
 *                      description: The Product Price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a products by Id
 *          tags:
 *              - Products
 *          description: Return a product based on unique id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the products
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                            $ref: '#components/schemas/Product'
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid Id
 *
 *
 */

router.get(
  "/:id",

  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  getProductsByID
);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 */
router.post(
  "/",

  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio de Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no Valido"),
  handleInputErrors,
  createProducts
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated products
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the products
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input date
 *          404:
 *              description: ProductNot Found
 *
 */
router.put(
  "/:id",

  param("id").isInt().withMessage("Id no valido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio de Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no Valido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Products availabilty
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the products
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input date
 *          404:
 *              description: ProductNot Found
 * 
 */
router.patch(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a Products by a given id
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the products to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input date
 *          404:
 *              description: ProductNot Found
 * 
 */
router.delete(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  deleteProducts
);

export default router;
