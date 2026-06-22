import { pool } from '../db/db.js'

export const getGifts = async (request, response) => { ... }

export const getGiftById = async (request, response) => { ... }

// Add these the same way 👇
export const createGift = async (req, res) => {
    try {
        const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
        const results = await pool.query(`
        INSERT INTO gifts (name, pricepoint, audience, image, description, submittedby, submittedon)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [name, pricepoint, audience, image, description, submittedby, submittedon]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}