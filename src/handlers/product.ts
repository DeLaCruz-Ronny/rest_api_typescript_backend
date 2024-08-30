
import { Request, Response } from 'express'
import Product from '../models/Products.models'


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const getProductsByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const products = await Product.findByPk(id)

        if (!products) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}


export const createProducts = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        //Validar si existe
        const { id } = req.params
        const products = await Product.findByPk(id)
        if (!products) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        //Actualizar
        await products.update(req.body)
        await products.save()

        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        //Validar si existe
        const { id } = req.params
        const products = await Product.findByPk(id)
        if (!products) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        //Actualizar
        products.availability = !products.dataValues.availability
        await products.save()

        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProducts = async (req: Request, res: Response) => {
    try {
        //Validar si existe
        const { id } = req.params
        const products = await Product.findByPk(id)
        if (!products) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        await products.destroy()
        res.json({data: 'Producto Eliminado'})


    } catch (error) {
        console.log(error)
    }
}