const Document = require('../models/document');
const func = require('../config/function');
const fileController = require('./fileController');
const uploadFile = fileController.uploadFile;
const uploadImg = fileController.uploadImg;

const Router = require('express');
const router = new Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// get all document data
exports.getAll = (req, res, next) => {
    Document.find().then((data) => {
            res.status(200).jsonp({
                message: 'Get all documents.',
                code: 200,
                data: data,
            });
        }
    );
};

// get one document by id
exports.findById = (req, res, next) => {
    const id = req.params.id;
    Document.findById(id).then((data) => {
            res.status(200).jsonp({
                message: 'Get ' + id + ' documents.',
                code: 200,
                data: data,
            });
        }
    );
};

// create document
exports.create = (req, res, next) => {
    const name = req.body.name;
    const ansi_name = func.change_alias(name);
    const description = req.body.description;
    const content = req.body.content;
    const grade_id = req.body.grade_id;
    const subject_id = req.body.subject_id;
    const tags = req.body.tag.split(',');
    let url_file = '';
    let url_img = '';
    uploadFile(req, res, (err) => {
        if (err) {
            res.status(500).jsonp({
                message: 'Error when upload file: ' + err,
                code: 500,
            });
        }
    });
    url_file = func.getFileName(req.files.originalname);
    uploadImg(req, res, (err) => {
        if (err) {
            res.jsonp({
                message: 'Error when upload images: ' + err,
                code: 500,
            });
        }
    });
    url_img = func.getFileName(req.files.originalname);
    Document.create(
        {
            name: name,
            ansi_name: ansi_name,
            description: description,
            posted_by: {
                id_user: 1,
                user_name: 'DMT',
            },
            url_file: url_file,
            url_img: url_img,
            content: content,
            tags: tags,
            grade_id: grade_id,
            subject_id: subject_id,
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

// update document by id
exports.update = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const content = req.body.content;
    const grade_id = req.body.grade_id;
    const subject_id = req.body.subject_id;
    const tags = req.body.tag.split(',');
    let url_file = '';
    let url_img = '';
    uploadFile(req, res, (err) => {
        if (err) {
            res.jsonp({
                message: 'Error when upload file: ' + err,
                code: 500,
            });
        }
    });
    url_file = func.getFileName(req.files.originalname);
    uploadImg(req, res, (err) => {
        if (err) {
            res.jsonp({
                message: 'Error when upload images: ' + err,
                code: 500,
            });
        }
    });
    url_img = func.getFileName(req.files.originalname);
    let document = {};
    if (name !== null) {
        const ansi_name = func.change_alias(name);
        document.name = name;
        document.ansi_name = ansi_name;
    }
    if (description !== null) document.description = description;
    if (content !== null) document.content = content;
    if (grade_id !== null) document.grade_id = grade_id;
    if (subject_id !== null) document.subject_id = subject_id;
    if (url_file !== null) document.url_file = url_file;
    if (url_img !== null) document.url_img = url_img;
    Document.findByIdAndUpdate(req.params.id, document, {new: true})
    .then(() => {
        Document.findById(req.params.id).then((updatedDoc) => {
            let oldTags = updatedDoc.tag;
            tags.forEach((tag) => {
                if (oldTags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            });
        });
        res.status(200).jsonp({
            message: 'Update successfully',
            code: '200',
        });
    });
};

// delete document by id
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
