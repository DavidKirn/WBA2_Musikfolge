const helper = require('../helper.js');
const LiedDao = require('../dao/liedDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Lied');

serviceRouter.get('/lied/gib/:id', function(request, response) {
    console.log('Service Lied: Client requested one record, id=' + request.params.id);

    const liedDao = new LiedDao(request.app.locals.dbConnection);
    try {
        var obj = liedDao.loadById(request.params.id);
        console.log('Service Lied: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Lied: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/lied/such/:name', function(request, response) {
    console.log('Service Lied: Client requested all records that match name, name=' + request.params.name);

    const liedDao = new LiedDao(request.app.locals.dbConnection);
    try {
        var arr = liedDao.loadByName(request.params.name);
        console.log('Service Lied: Records loaded');
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Lied: Error loading matched records by name. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/lied/alle', function(request, response) {
    console.log('Service Lied: Client requested all records');

    const liedDao = new LiedDao(request.app.locals.dbConnection);
    try {
        var arr = liedDao.loadAll();
        console.log('Service Lied: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Lied: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/lied/existiert/:id', function(request, response) {
    console.log('Service Lied: Client requested check, if record exists, id=' + request.params.id);

    const liedDao = new LiedDao(request.app.locals.dbConnection);
    try {
        var exists = liedDao.exists(request.params.id);
        console.log('Service Lied: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({ 'id': request.params.id, 'existiert': exists });
    } catch (ex) {
        console.error('Service Lied: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/lied', function(request, response) {
    console.log('Service Lied: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.titel)) {
        errorMsgs.push('titel fehlt');
    }
    if (helper.isUndefined(request.body.komponistid)) {
        errorMsgs.push('komponistid fehlt');
    }
    if (helper.isUndefined(request.body.bearbeiterid)) {
        errorMsgs.push('bearbeiterid fehlt');
    }
    if (helper.isUndefined(request.body.verlagid)) {
        errorMsgs.push('verlagid fehlt');
    }

    if (errorMsgs.length > 0) {
        console.log('Service Lied: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const liedDao = new LiedDao(request.app.locals.dbConnection);
    try {
        var obj = liedDao.create(request.body.titel, request.body.komponistid, request.body.bearbeiterid, request.body.verlagid);
        console.log('Service Lied: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Lied: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.put('/lied', function(request, response) {
    console.log('Service Lied: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) {
        errorMsgs.push('id fehlt');
    }
    if (helper.isUndefined(request.body.titel)) {
        errorMsgs.push('titel fehlt');
    }
    if (helper.isUndefined(request.body.komponistid)) {
        errorMsgs.push('komponistid fehlt');
    }
    if (helper.isUndefined(request.body.bearbeiterid)) {
        errorMsgs.push('bearbeiterid fehlt');
    }
    if (helper.isUndefined(request.body.verlagid)) {
        errorMsgs.push('verlagid fehlt');
    }

    if (errorMsgs.length > 0) {
        console.log('Service Lied: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const liedDao = new LiedDao(request.app.locals.dbConnection);
    try {
        var obj = liedDao.update(request.body.id, request.body.titel, request.body.komponistid, request.body.bearbeiterid, request.body.verlagid);
        console.log('Service Lied: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Lied: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/lied/:id', function(request, response) {
    console.log('Service Lied: Client requested deletion of record, id=' + request.params.id);

    const liedDao = new LiedDao(request.app.locals.dbConnection);
    try {
        var obj = liedDao.loadById(request.params.id);
        liedDao.delete(request.params.id);
        console.log('Service Lied: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Lied: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;