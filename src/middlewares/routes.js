import { randomUUID } from 'node:crypto';
import { buildRoutePath } from '../util/build-route-path.js';
import { Database } from './database.js';


const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const {search} = req.query
            const users = database.select('Users', search ? {
                name: search,
                email: search
            }: undefined )
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const {name, email} = req.body;
            const user = {
                id: randomUUID(),
                name,
                email
            }
            database.insert('Users', user)
            return res
                    .writeHead(201)
                    .end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params
            const {name, email} = req.body
            database.update('Users', id, {
                name, 
                email
            })

            return res.writeHead(204).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params
            database.delete('Users', id)

            return res.writeHead(204).end();
        }
    },
]