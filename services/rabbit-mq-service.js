import amqp from 'amqplib/callback_api';

let ch = null;
amqp.connect(process.env.CONN_URL, (err, conn) => {
    conn.createChannel((err, channel) => {
        ch = channel;
    });
});

export const publishToQueue = async (queueName, data) => {
    ch.sendToQueue(queueName, Buffer.from(data), {
        persistent: true
    });
};

process.on('exit', () => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
