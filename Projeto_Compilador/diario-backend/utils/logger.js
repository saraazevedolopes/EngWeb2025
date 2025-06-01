const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Garante que a pasta 'logs/' existe
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // ficheiro fica em JSON estruturado
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple() // legível no terminal
      )
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'app.log'),
      level: 'info'
    })
  ]
});

// Métodos personalizados

logger.httpRequest = (req) => {
  logger.info({
    tipo: 'HTTP',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    user: req.user?.email || 'anónimo'
  });
};

logger.evento = (evento, dadosExtra = {}) => {
  logger.info({
    tipo: 'EVENTO',
    evento,
    ...dadosExtra
  });
};

logger.erro = (err, req) => {
  logger.error({
    tipo: 'ERRO',
    error: err.message,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    user: req.user?.email || 'anónimo'
  });
};

module.exports = logger;
