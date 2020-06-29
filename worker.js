import amqp from 'amqplib/callback_api';
import {client} from "./utils/pg-client";

import express from 'express';
import http from 'http';
import socket from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socket(server);
const consumeSender = io.of('consume');

client.connect().then(() => {
    amqp.connect(process.env.CONN_URL, (err, conn) => {
        conn.createChannel((err, ch) => {
            ch.consume('user-messages',
                async msg => {
                    console.log('.....');
                    const res = await client.query(
                        'INSERT INTO user_messages(content) VALUES ($1) RETURNING *',
                        [msg.content.toString()]
                    );
                    consumeSender.emit('consume', res.rows);
                    console.log("Message:", msg.content.toString());
                    ch.ack(msg);
                }, {
                    noAck: false
                }
            );
        });
    });
});

server.listen(30007, async () =>{
    console.log(' ********** : running on 30007');
});

process.on('exit', (code) => {
    client.end();
    console.log(`About to exit with code: ${code}`);
});
