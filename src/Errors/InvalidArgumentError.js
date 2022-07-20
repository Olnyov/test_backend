const BaseError = require('./BaseError');

/**
 * Ошибка в аргументах вызова
 */
class InvalidArgumentError extends BaseError {
    /**
     * Конструктор
     *
     * @param message
     * @param loggerName
     */
    constructor(message, loggerName) {
        super(message, loggerName, 400);
    }
}

module.exports = InvalidArgumentError;