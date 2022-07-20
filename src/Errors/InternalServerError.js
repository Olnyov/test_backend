const BaseError = require('./BaseError');

/**
 * Ошибка сервиса
 */
class InternalServerError extends BaseError {
    /**
     * Конструктор
     *
     * @param message
     * @param loggerName
     */
    constructor(message, loggerName) {
        super(message, loggerName, 500);
    }
}

module.exports = InternalServerError;