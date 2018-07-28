const documentRouter = require('./documentRouter');
const tagRouter = require('./tagRouter');

module.exports = (app) => {
    app.use('/document', documentRouter);
    app.use('/tag', tagRouter);
};
