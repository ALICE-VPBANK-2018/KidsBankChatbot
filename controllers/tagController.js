const Tag = require('../models/tag');
const func = require('../config/function');

const Router = require('express');
const router = new Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// get all tag data
exports.getAll = (req, res, next) => {
    Tag.find().then((data) => {
            res.status(200).jsonp({
                message: 'Get all tags.',
                code: 200,
                data: data,
            });
        }
    );
};

// get one tag by id
exports.findById = (req, res, next) => {
    const id = req.params.id;
    Tag.findById(id).then((data) => {
            res.status(200).jsonp({
                message: 'Get ' + id + ' tags.',
                code: 200,
                data: data,
            });
        }
    );
};

// create tag
exports.create = (req, res, next) => {
    const name = req.body.name;
    const ansi_name = func.change_alias(name);
    const description = req.body.description;
    Tag.create(
        {
            name: name,
            ansi_name: ansi_name,
            description: description,
        },
        (err) => {
            if (err) {
                res.status(500).jsonp({
                    message: 'Error when create new tag: ' + err,
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

// update tag by id
exports.update = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    let tag = {};
    if (name !== null) {
        const ansi_name = func.change_alias(name);
        tag.name = name;
        tag.ansi_name = ansi_name;
    }
    if (description !== null) tag.description = description;
    Tag.findByIdAndUpdate(req.params.id, tag, {new: true})
    .then(() => {
        res.status(200).jsonp({
            message: 'Update successfully',
            code: '200',
        });
    });
};

// delete tag by id
exports.delete = (req, res, next) => {
    const id = req.params.id;
    Tag.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log('Error when delete id' + id + ' : ' + err);
            res.status(500).jsonp({
                message: 'Error when delete id' + id + ' : ' + err,
                code: 500,
            });
        } else {
            res.status(200).jsonp({
                message: 'Delete tag ' + id + ' successfully',
                code: 200,
            });
        }
    });
};
