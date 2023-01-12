const helper = require('../helper.js');
const KomponistDao = require('../dao/komponistDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Komponist');

serviceRouter.get('/komponist/gib/:id', function(request, response) {
    console.log('Service Komponist: Client requested one record, id=' + request.params.id);

    const komponistDao = new KomponistDao(request.app.locals.dbConnection);
    try {
        var obj = komponistDao.loadById(request.params.id);
        console.log('Service Komponist: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Komponist: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/komponist/such/:name', function(request, response) {
    console.log('Service Komponist: Client requested one record, name=' + request.params.name);

    const komponistDao = new KomponistDao(request.app.locals.dbConnection);
    try {
        var obj = komponistDao.loadByName(request.params.name);
        console.log('Service Komponist: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Komponist: Error loading searched records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/komponist/alle', function(request, response) {
    console.log('Service Komponist: Client requested all records');

    const komponistDao = new KomponistDao(request.app.locals.dbConnection);
    try {
        var arr = komponistDao.loadAll();
        console.log('Service Komponist: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Komponist: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/komponist/existiert/:id', function(request, response) {
    console.log('Service Komponist: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const komponistDao = new KomponistDao(request.app.locals.dbConnection);
    try {
        var exists = komponistDao.exists(request.params.id);
        console.log('Service Komponist: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Komponist: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/komponist', function(request, response) {
    console.log('Service Komponist: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Komponist: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const komponistDao = new KomponistDao(request.app.locals.dbConnection);
    try {
        var obj = komponistDao.create(request.body.name);
        console.log('Service Komponist: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Komponist: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/komponist', function(request, response) {
    console.log('Service Komponist: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Komponist: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const komponistDao = new KomponistDao(request.app.locals.dbConnection);
    try {
        var obj = komponistDao.update(request.body.id, request.body.name);
        console.log('Service Komponist: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Komponist: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/komponist/:id', function(request, response) {
    console.log('Service Komponist: Client requested deletion of record, id=' + request.params.id);

    const komponistDao = new KomponistDao(request.app.locals.dbConnection);
    try {
        var obj = komponistDao.loadById(request.params.id);
        komponistDao.delete(request.params.id);
        console.log('Service Komponist: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Komponist: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;