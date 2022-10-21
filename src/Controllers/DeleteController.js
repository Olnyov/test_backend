
const Controller = require('./Controller');
const _debug = Symbol();
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'danila';

class DeleteController extends Controller {

    /**
     * Конструктор
     *
     */
    constructor() {
        super();
    }

    /**
     *
     * @param req
     * @param res
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
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('density');
        return await collection.deletetOne();
    }
}

module.exports = DeleteController;