const nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    emailValidator = require("email-validator");

const Controller = require('./Controller'),
    SendMailInvalidArgumentError = require('./../Errors/SendMailInvalidArgumentError'),
    SendMailInternalServerError = require('./../Errors/SendMailInternalServerError');

const _userSmtp = Symbol(),
    _passSmtp = Symbol(),
    _sendMailFrom = Symbol(),
    _debug = Symbol();

/**
 * Отправляем почту
 */
class SendMailController extends Controller {

    /**
     * Конструктор
     *
     * @param userSmtp
     * @param passSmtp
     * @param sendMailFrom
     * @param debug
     */
    constructor(userSmtp, passSmtp, sendMailFrom, debug) {
        super();

        this[_userSmtp] = userSmtp;
        this[_passSmtp] = passSmtp;
        this[_sendMailFrom] = sendMailFrom;
        this[_debug] = debug === 'true';
    }

    /**
     *
     * @param req
     * @param res
     */
    do(req, res) {
        if (!this[_sendMailFrom]) {
            throw new SendMailInternalServerError('Empty "SEND_MAIL_FROM" in .env');
        }

        if (!req.body.to) {
            throw new SendMailInvalidArgumentError('Empty "to"');
        }

        let emails = [];
        req.body.to.split(',').forEach((email) => {
            email = email.trim();
            if (emailValidator.validate(email)) {
                emails.push(email);
            }
        });

        if (!emails.length) {
            throw new SendMailInvalidArgumentError('No valid emails in "to"');
        }

        if (!req.body.subject) {
            throw new SendMailInvalidArgumentError('Empty "subject"');
        }

        if (!req.body.html) {
            throw new SendMailInvalidArgumentError('Empty "html"');
        }

        if (!req.body.attachments) {
            req.body.attachments = [];
        }

        if (this[_debug]) {
            this.response(res);

            return;
        }

        const transporter = nodemailer.createTransport(
            smtpTransport({
                service: 'yandex',
                host: 'smtp.yandex.ru',
                auth: {
                    user: this[_userSmtp],
                    pass: this[_passSmtp],
                },
            })
        );

        const mailOptions = {
            from: this[_sendMailFrom],
            to: emails.join(','),
            subject: req.body.subject,
            html: req.body.html,
            attachments: req.body.attachments
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                this.error(new SendMailInternalServerError(err.message), res);

                return;
            }

            this.response(res);
        });
    }
}

module.exports = SendMailController;