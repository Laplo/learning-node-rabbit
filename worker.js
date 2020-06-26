import amqp from 'amqplib/callback_api';
import {client} from "./utils/pg-client";

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
                    console.log("Message:", msg.content.toString());
                    ch.ack(msg);
                }, {
                    noAck: false
                }
            );
        });
    });
});

process.on('exit', (code) => {
    client.end();
    console.log(`About to exit with code: ${code}`);
});
