const Document = require('../models/document');
const func = require('../config/function');

const Router = require('express');
const router = new Router();
const bodyParser = require('body-parser');
require('mongoose-query-random');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// get all document data
exports.getAll = (req, res, next) => {
    Document.find().then(function(data){
        res.status(200).jsonp({
            message: 'Get all documents.',
            code: 200,
            data: data,
        });
    });
};

// get one document by id
exports.findById = (req, res, next) => {
    const id = req.params.id;
    Document.findById(id).then((data) => {
            res.status(200).jsonp({
                message: 'Get ' + id + ' document.',
                code: 200,
                data: data,
            });
        }
    );
};

// get document by level
exports.pagenition = (req, res, next) => {
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);
    console.log(limit + offset);
    Document.find().limit(limit).skip(offset).then((data) => {
            res.status(200).jsonp({
                message: 'Get document.',
                code: 200,
                data: data,
            });
        }
    );
};

// create document
exports.create = (req, res, next) => {
    const content = req.body.content;
    const summarization = func.summarization(content);
    const keywords = func.extractKeywords(summarization);
    console.log('\n' + summarization);
    console.log('\n' + keywords);
    Document.create(
        {
            summarization: summarization,
            content: content,
            keywords: keywords.join(),
        },
        (err) => {
            if (err) {
                res.status(500).jsonp({
                    message: 'Error when create new document: ' + err,
                    code: 500,
                });
            } else {
                res.status(200).jsonp({
                    message: 'Create successfully',
                    code: '200',
                });
            }
        }
    );
};

// delete quiz by id
exports.delete = (req, res, next) => {
    const id = req.params.id;
    Document.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log('Error when delete id' + id + ' : ' + err);
            res.status(500).jsonp({
                message: 'Error when delete id' + id + ' : ' + err,
                code: 500,
            });
        } else {
            res.status(200).jsonp({
                message: 'Delete document ' + id + ' successfully',
                code: 200,
            });
        }
    });
};
