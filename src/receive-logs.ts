import amqp from 'amqplib/callback_api';

amqp.connect('amqp://localhost', function(error0: Error, connection: amqp.Connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1: Error, channel: amqp.Channel) {
    if (error1) {
      throw error1;
    }
    const exchange: string = 'logs';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2: Error, q: amqp.Replies.AssertQueue) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg: amqp.Message | null) {
        if(msg && msg.content) {
            console.log(" [x] %s", msg.content.toString());
          }
      }, {
        noAck: true
      });
    });
  });
});