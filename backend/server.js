import express from 'express';
import cors from 'cors';
import { mailinglist } from './mailinglist.js';
import { conway } from './conway.js'

const server = express();
server.use(express.json())
server.use(cors())
server.use('/mailinglist', mailinglist);
server.use('/conway', conway)
server.get('/', (req, res) => res.send('There is nothing to see here, for the moment anyway. Now move along'));

server.listen(1337, () => console.log("Backend running"));
