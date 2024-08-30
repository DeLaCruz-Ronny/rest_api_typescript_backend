
import request from 'supertest'
import server from "../server";

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')
        console.log(res)
    })
})