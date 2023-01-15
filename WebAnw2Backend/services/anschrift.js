const helper = require('../helper.js');
const AnschriftDao = require('../dao/anschriftDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Anschrift');

serviceRouter.get('/anschrift/gib/:id', function(request, response) {
    console.log('Service Anschrift: Client requested one record, id=' + request.params.id);

    const anschriftDao = new AnschriftDao(request.app.locals.dbConnection);
    try {
        var obj = anschriftDao.loadById(request.params.id);
        console.log('Service Anschrift: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Anschrift: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/anschrift/alle', function(request, response) {
    console.log('Service Anschrift: Client requested all records');

    const anschriftDao = new AnschriftDao(request.app.locals.dbConnection);
    try {
        var arr = anschriftDao.loadAll();
        console.log('Service Anschrift: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Anschrift: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/anschrift/existiert/:id', function(request, response) {
    console.log('Service Anschrift: Client requested check, if record exists, id=' + request.params.id);

    const anschriftDao = new AnschriftDao(request.app.locals.dbConnection);
    try {
        var exists = anschriftDao.exists(request.params.id);
        console.log('Service Anschrift: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Anschrift: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/anschrift', function(request, response) {
    console.log('Service Anschrift: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.strasse)) 
        errorMsgs.push('strasse fehlt');
    if (helper.isUndefined(request.body.hausnr)) 
        errorMsgs.push('hausnummer fehlt');
    if (helper.isUndefined(request.body.plz)) 
        errorMsgs.push('plz fehlt');
    if (helper.isUndefined(request.body.ort)) 
        errorMsgs.push('ort fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Anschrift: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const anschriftDao = new AnschriftDao(request.app.locals.dbConnection);
    try {
        var obj = anschriftDao.create(request.body.strasse, request.body.hausnr, request.body.plz, request.body.ort);
        console.log('Service Anschrift: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Anschrift: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/anschrift', function(request, response) {
    console.log('Service Anschrift: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehl');
    if (helper.isUndefined(request.body.strasse)) 
        errorMsgs.push('strasse fehl');
    if (helper.isUndefined(request.body.hausnr)) 
        errorMsgs.push('hausnummer fehl');
    if (helper.isUndefined(request.body.plz)) 
        errorMsgs.push('plz fehl');
    if (helper.isUndefined(request.body.ort)) 
        errorMsgs.push('ort fehl');

    if (errorMsgs.length > 0) {
        console.log('Service Anschrift: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const anschriftDao = new AnschriftDao(request.app.locals.dbConnection);
    try {
        var obj = anschriftDao.update(request.body.id, request.body.strasse, request.body.hausnr, request.body.plz, request.body.ort);
        console.log('Service Anschrift: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Anschrift: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/anschrift/:id', function(request, response) {
    console.log('Service Anschrift: Client requested deletion of record, id=' + request.params.id);

    const anschriftDao = new AnschriftDao(request.app.locals.dbConnection);
    try {
        var obj = anschriftDao.loadById(request.params.id);
        anschriftDao.delete(request.params.id);
        console.log('Service Anschrift: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Anschrift: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;