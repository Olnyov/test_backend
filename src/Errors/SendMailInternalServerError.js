const InvalidArgumentError = require('./InvalidArgumentError');

/**
 * Ошибка SendMailController
 */
class SendMailInternalServerError extends InvalidArgumentError {
    /**
     * Конструктор
     *
     * @param message
     */
    constructor(message) {
        super(message, 'SendMailController');
    }
}

module.exports = SendMailInternalServerError;