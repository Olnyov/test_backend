const InvalidArgumentError = require('./InvalidArgumentError');

/**
 * Ошибка SendMailController
 */
class SendMailInvalidArgumentError extends InvalidArgumentError {
    /**
     * Конструктор
     *
     * @param message
     */
    constructor(message) {
        super(message, 'SendMailController');
    }
}

module.exports = SendMailInvalidArgumentError;