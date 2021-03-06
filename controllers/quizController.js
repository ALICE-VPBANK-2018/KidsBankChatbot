const Quiz = require('../models/quiz');
const func = require('../config/function');

const Router = require('express');
const router = new Router();
const bodyParser = require('body-parser');
require('mongoose-query-random');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// get all quiz data
exports.getAll = (req, res, next) => {
    Quiz.find().then(function(data){
        res.status(200).jsonp({
            message: 'Get all quiz.',
            code: 200,
            data: data,
        });
    });
};

// get one quiz by id
exports.findById = (req, res, next) => {
    const id = req.params.id;
    Quiz.findById(id).then((data) => {
            res.status(200).jsonp({
                message: 'Get ' + id + ' quiz.',
                code: 200,
                data: data,
            });
        }
    );
};

// get quizs by level
exports.getByLevel = (req, res, next) => {
    const level = req.params.level;
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);
    console.log(level + limit + offset);
    Quiz.find({'level': level}).limit(limit).skip(offset).then((data) => {
            res.status(200).jsonp({
                message: 'Get quiz.',
                code: 200,
                data: data,
            });
        }
    );
};

// get one quiz random
exports.getOneRandom = (req, res, next) => {
    Quiz.find().random(1, true, function(err, data) {
        if (err) throw err;
        res.status(200).jsonp({
            message: 'Get quiz.',
            code: 200,
            data: data,
        });
    });
};

// check one quiz's answers
exports.checkAnswer = (req, res, next) => {
    const id = req.params.id;
    const id_answer = req.params.id_answer;
    Quiz.findById(id).then((data) => {
        console.log(data);
        console.log(id_answer);
        if(data.options[id_answer].is_true == true){
            res.status(200).jsonp({
                message: data.options[id_answer].explain,
                code: 200,
                data: true,
            });
        } else {
            res.status(200).jsonp({
                message: 'check one ' + id + ' quiz answers' + id_answer,
                code: 200,
                data: false,
            });
        }
    }
);
};

// create document
exports.create = (req, res, next) => {
    console.log(req.body.level);
    const level = req.body.level;
    const content = req.body.content;
    const options = req.body.options;
    Quiz.create(
        {
            level: level,
            content: content,
            options: options,
        },
        (err) => {
            if (err) {
                res.status(500).jsonp({
                    message: 'Error when create new quiz: ' + err,
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
    Quiz.findByIdAndRemove(id, (err) => {
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
