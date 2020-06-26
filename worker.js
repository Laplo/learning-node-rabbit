import amqp from 'amqplib/callback_api';

amqp.connect(process.env.CONN_URL, (err, conn) => {
    conn.createChannel((err, ch) => {
        ch.consume('user-messages',
            msg => {
                console.log('.....');
                console.log("Message:", msg.content.toString());
                ch.ack(msg);
            }, {
                noAck: false
            }
        );
    });
});
