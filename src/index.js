const net = require('net');
const chalk = require('chalk');
const log = console.log; // eslint-disable-line

module.exports = ({
  host,
  port,
  texts = []
}) => {
  const client = new net.Socket();

  log(chalk.yellow(`[tcp-status] try to connect to ${host}:${port}`));

  client.connect(port, host, () => {
    log(chalk.yellow('[tcp-status] tcp connected'));

    texts.forEach((text) => {
      log(chalk.yellow(`[tcp-status] try to send text ${text}`));
      client.write(text.toString());
    });
  });

  client.on('data', (data) => {
    log(chalk.yellow('[tcp-status] recieved data: '));
    log(chalk.white(data.toString()));
  });

  client.on('close', () => {
    log(chalk.yellow('[tcp-status] tcp closed'));
  });

  client.on('error', (e) => {
    log(chalk.red(`[tcp-status] ${e.message}`));
  });
};
