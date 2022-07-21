const InternalServerError = require('./InternalServerError');

/**
 * Ошибка SendMailController
 */
class SendMailInternalServerError extends InternalServerError {
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