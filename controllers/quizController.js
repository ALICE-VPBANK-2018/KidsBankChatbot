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
    console.log('Hello');
    limitrecords = req.params.size;
    level = req.params.level;
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

// update document by id
// exports.update = (req, res, next) => {
//     const name = req.body.name;
//     const description = req.body.description;
//     const content = req.body.content;
//     const grade_id = req.body.grade_id;
//     const subject_id = req.body.subject_id;
//     const tags = req.body.tag.split(',');
//     let url_file = '';
//     let url_img = '';
//     uploadFile(req, res, (err) => {
//         if (err) {
//             res.jsonp({
//                 message: 'Error when upload file: ' + err,
//                 code: 500,
//             });
//         }
//     });
//     url_file = func.getFileName(req.files.originalname);
//     uploadImg(req, res, (err) => {
//         if (err) {
//             res.jsonp({
//                 message: 'Error when upload images: ' + err,
//                 code: 500,
//             });
//         }
//     });
//     url_img = func.getFileName(req.files.originalname);
//     let document = {};
//     if (name !== null) {
//         const ansi_name = func.change_alias(name);
//         document.name = name;
//         document.ansi_name = ansi_name;
//     }
//     if (description !== null) document.description = description;
//     if (content !== null) document.content = content;
//     if (grade_id !== null) document.grade_id = grade_id;
//     if (subject_id !== null) document.subject_id = subject_id;
//     if (url_file !== null) document.url_file = url_file;
//     if (url_img !== null) document.url_img = url_img;
//     Document.findByIdAndUpdate(req.params.id, document, {new: true})
//     .then(() => {
//         Document.findById(req.params.id).then((updatedDoc) => {
//             let oldTags = updatedDoc.tag;
//             tags.forEach((tag) => {
//                 if (oldTags.indexOf(tag) === -1) {
//                     tags.push(tag);
//                 }
//             });
//         });
//         res.status(200).jsonp({
//             message: 'Update successfully',
//             code: '200',
//         });
//     });
// };

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
