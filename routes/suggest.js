const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const validations = [
    check('start')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('Starting point is required'),
    check('vehicle')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('Vehicle is required'),
    check('end')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('End point is required'),
    check('cost')
        .trim()
        .isNumeric()
        .escape()
        .withMessage('Cost must be a number'),
    check('ave_time')
        .trim()
        .isNumeric()
        .escape()
        .withMessage('Average travel time must be a number'),
];

module.exports = params => {
    const { suggestionService } = params;

    router.get('/', async (request, response, next) => {
        try {
            const suggest = await suggestionService.getList();

            const errors = request.session.suggest ? request.session.suggest.errors : false;

            const successMessage = request.session.suggest ? request.session.suggest.message : false;

            request.session.suggest = {};

            return response.render('layout/komyut_search', {
                pageTitle: 'Suggest',
                template: 'komyut_suggest',
                suggest,
                errors,
                successMessage,
            });
        } catch (err) {
            return next(err);
        }
    });

    router.post('/', validations, async (request, response, next) => {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                request.session.suggest = {
                    errors: errors.array(),
                };
                return response.redirect('/suggest');
            }
    
           // eslint-disable-next-line camelcase
           const { start, vehicle, end, cost, ave_time } = request.body;
            await suggestionService.addEntry(start, vehicle, end, cost, ave_time);
            request.session.suggest = {
                message: 'Thank you for your suggestion!',
            };
    
            // eslint-disable-next-line no-console
            console.log(request.body);
            return response.redirect('/submitted');
        } catch (err) {
            return next(err);
        }
    });

    router.post('/api', validations, async (request, response, next) => {

        try {
            const errors = validationResult(request);
            if(!errors.isEmpty()) {
                return response.json({errors: errors.array()});
            }
            const { start, vehicle, end, cost, ave_time } = request.body;
            await suggestionService.addEntry(start, vehicle, end, cost, ave_time);
            const suggestions = await suggestionService.getList();
            return response.json({suggestions});
        }catch (err){
            return next(err);
        }
    });

    return router;
}