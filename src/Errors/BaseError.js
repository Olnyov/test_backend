const _status = Symbol(),
    _loggerName = Symbol();

/**
 * Внутренняя ошибка
 */
class BaseError extends Error {
    /**
     * Конструктор
     *
     * @param message
     * @param loggerName
     * @param status
     */
    constructor(message, loggerName, status) {
        super(message);
        this[_loggerName] = loggerName;
        this[_status] = status;
    }

    /**
     * Статус
     *
     * @returns {Number}
     */
    get status() {
        return this[_status];
    }

    get loggerName() {
        return this[_loggerName];
    }
}

module.exports = BaseError;