const helper = require('../helper.js');
const BearbeiterDao = require('../dao/bearbeiterDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Bearbeiter');

serviceRouter.get('/bearbeiter/gib/:id', function(request, response) {
    console.log('Service Bearbeiter: Client requested one record, id=' + request.params.id);

    const bearbeiterDao = new BearbeiterDao(request.app.locals.dbConnection);
    try {
        var obj = bearbeiterDao.loadById(request.params.id);
        console.log('Service Bearbeiter: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Bearbeiter: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/bearbeiter/alle', function(request, response) {
    console.log('Service Bearbeiter: Client requested all records');

    const bearbeiterDao = new BearbeiterDao(request.app.locals.dbConnection);
    try {
        var arr = bearbeiterDao.loadAll();
        console.log('Service Bearbeiter: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Bearbeiter: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/bearbeiter/existiert/:id', function(request, response) {
    console.log('Service Bearbeiter: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const bearbeiterDao = new BearbeiterDao(request.app.locals.dbConnection);
    try {
        var exists = bearbeiterDao.exists(request.params.id);
        console.log('Service Bearbeiter: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Bearbeiter: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/bearbeiter', function(request, response) {
    console.log('Service Bearbeiter: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Bearbeiter: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const bearbeiterDao = new BearbeiterDao(request.app.locals.dbConnection);
    try {
        var obj = bearbeiterDao.create(request.body.name);
        console.log('Service Bearbeiter: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Bearbeiter: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/bearbeiter', function(request, response) {
    console.log('Service Bearbeiter: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Bearbeiter: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const bearbeiterDao = new BearbeiterDao(request.app.locals.dbConnection);
    try {
        var obj = bearbeiterDao.update(request.body.id, request.body.name);
        console.log('Service Bearbeiter: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Bearbeiter: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/bearbeiter/:id', function(request, response) {
    console.log('Service Bearbeiter: Client requested deletion of record, id=' + request.params.id);

    const bearbeiterDao = new BearbeiterDao(request.app.locals.dbConnection);
    try {
        var obj = bearbeiterDao.loadById(request.params.id);
        bearbeiterDao.delete(request.params.id);
        console.log('Service Bearbeiter: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Bearbeiter: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;