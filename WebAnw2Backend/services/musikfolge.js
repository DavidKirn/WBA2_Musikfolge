const helper = require('../helper.js');
const MusikfolgeDao = require('../dao/musikfolgeDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Musikfolge');

serviceRouter.get('/musikfolge/gib/:id', function(request, response) {
    console.log('Service Musikfolge: Client requested one record, id=' + request.params.id);

    const musikfolgeDao = new MusikfolgeDao(request.app.locals.dbConnection);
    try {
        var obj = musikfolgeDao.loadById(request.params.id);
        console.log('Service Musikfolge: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Musikfolge: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/musikfolge/alle', function(request, response) {
    console.log('Service Musikfolge: Client requested all records');

    const musikfolgeDao = new MusikfolgeDao(request.app.locals.dbConnection);
    try {
        var arr = musikfolgeDao.loadAll();
        console.log('Service Musikfolge: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Musikfolge: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/musikfolge/existiert/:id', function(request, response) {
    console.log('Service Musikfolge: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const musikfolgeDao = new MusikfolgeDao(request.app.locals.dbConnection);
    try {
        var exists = musikfolgeDao.exists(request.params.id);
        console.log('Service Musikfolge: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Musikfolge: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/musikfolge', function(request, response) {
    console.log('Service Musikfolge: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Musikfolge: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const musikfolgeDao = new MusikfolgeDao(request.app.locals.dbConnection);
    try {
        var obj = musikfolgeDao.create(request.body.name);
        console.log('Service Musikfolge: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Musikfolge: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/musikfolge', function(request, response) {
    console.log('Service Musikfolge: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Musikfolge: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const musikfolgeDao = new MusikfolgeDao(request.app.locals.dbConnection);
    try {
        var obj = musikfolgeDao.update(request.body.id, request.body.name);
        console.log('Service Musikfolge: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Musikfolge: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/musikfolge/:id', function(request, response) {
    console.log('Service Musikfolge: Client requested deletion of record, id=' + request.params.id);

    const musikfolgeDao = new MusikfolgeDao(request.app.locals.dbConnection);
    try {
        var obj = musikfolgeDao.loadById(request.params.id);
        musikfolgeDao.delete(request.params.id);
        console.log('Service Musikfolge: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Musikfolge: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;