// Program Aplikasi Openmusic Consumer

require('dotenv').config();
const amqp = require('amqplib');
const OpenmusicService = require('./OpenmusicService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  // Openmusic Service
  const openmusicService = new OpenmusicService();

  // Pengaturan Email
  const mailSender = new MailSender();

  // Proses Pengiriman Data
  const listener = new Listener(openmusicService, mailSender);

  // Proses Koneksi Dengan Chanel RabbitMQ
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlist', {
    durable: true,
  });

  channel.consume('export:playlist', listener.listen, { noAck: true });
};

init();
