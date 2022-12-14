
const Controller = require('./Controller');
const _debug = Symbol();
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'danila';

class TestController extends Controller {

    /**
     * Конструктор
     *
     */
    constructor() {
        super();
    }

    /**
     *
     * @param req отвечает за запрос, кот мы делаем с браузера
     * @param res отвечает за ответ
     */
    do(req, res) {
        this.main(req)
            .then((result) => {
                res.send(result);
                this.response(res);
            })
            .catch(console.error)
            .finally(() => client.close());


    }

    async main(req) {
        console.log(req.query.title);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('density');
        return await collection.findOne({"title": req.query.title});

    }
}

module.exports = TestController;