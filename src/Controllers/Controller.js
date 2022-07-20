const moment = require("moment");

const BaseError = require("./../Errors/BaseError")

class Controller {

    /**
     * Конструктор
     */
    constructor() {
    }

    /**
     *
     * @param req
     * @param res
     */
    controller(req, res) {
        try {
            this.do(req, res);
        } catch (error) {
            if (error instanceof BaseError) {
                this.error(error, res);

                return;
            }

            throw error;
        }
    }

    /**
     * Вывод ошибок
     * @param error
     * @param res
     */
    error(error, res)
    {
        console.log(JSON.stringify({
            '@timestamp': moment().toISOString(),
            'message': error.message,
            'logger_name': error.loggerName,
        }));
        res.status(error.status).send({
            success: false,
            error: error.message,
        })
    }

    response(res)
    {
        res.status(200).send({
            success: true,
            error: null,
        })
    }
}

module.exports = Controller;