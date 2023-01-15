const helper = require('../helper.js');
const VereinDao = require('../dao/vereinDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Verein');

serviceRouter.get('/verein/gib/:id', function(request, response) {
    console.log('Service Verein: Client requested one record, id=' + request.params.id);

    const vereinDao = new VereinDao(request.app.locals.dbConnection);
    try {
        var obj = vereinDao.loadById(request.params.id);
        console.log('Service Verein: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Verein: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/verein/alle', function(request, response) {
    console.log('Service Verein: Client requested all records');

    const vereinDao = new VereinDao(request.app.locals.dbConnection);
    try {
        var arr = vereinDao.loadAll();
        console.log('Service Verein: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Verein: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/verein/existiert/:id', function(request, response) {
    console.log('Service Verein: Client requested check, if record exists, id=' + request.params.id);

    const vereinDao = new VereinDao(request.app.locals.dbConnection);
    try {
        var exists = vereinDao.exists(request.params.id);
        console.log('Service Verein: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Verein: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/verein', function(request, response) {
    console.log('Service Verein: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');
    if (helper.isUndefined(request.body.musikleitervorname)) 
        request.body.musikleitervorname = '';
    if (helper.isUndefined(request.body.musikleiternachname)) 
        request.body.musikleiternachname = '';
    if (helper.isUndefined(request.body.anschrift.id)) {
        errorMsgs.push('adresse fehlt');
    }
    if (helper.isUndefined(request.body.anzahlMusiker)) {
        request.body.anzahlMusiker = 0;
    }
    if (helper.isUndefined(request.body.besetzung)) {
        request.body.besetzung = '';
    }
    if (helper.isUndefined(request.body.mitgliedsnr)) {
        request.body.besetzung = 0;
    }
    
    if (errorMsgs.length > 0) {
        console.log('Service Verein: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const vereinDao = new VereinDao(request.app.locals.dbConnection);
    try {
        var obj = vereinDao.create(request.body.name, request.body.musikleitervorname, request.body.musikleiternachname, request.body.anschrift.id, request.body.anzahlMusiker, request.body.besetzung, request.body.mitgliedsnr);
        console.log('Service Verein: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Verein: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/verein', function(request, response) {
    console.log('Service Verein: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');
    if (helper.isUndefined(request.body.musikleitervorname)) 
        request.body.musikleitervorname = '';
    if (helper.isUndefined(request.body.musikleiternachname)) 
        request.body.musikleiternachname = '';
    if (helper.isUndefined(request.body.anschrift.id)) {
        errorMsgs.push('adresse fehlt');
    }
    if (helper.isUndefined(request.body.anzahlMusiker)) {
        request.body.anzahlMusiker = 0;
    }
    if (helper.isUndefined(request.body.besetzung)) {
        request.body.besetzung = '';
    }
    if (helper.isUndefined(request.body.mitgliedsnr)) {
        request.body.besetzung = 0;
    }

    if (errorMsgs.length > 0) {
        console.log('Service Verein: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const vereinDao = new VereinDao(request.app.locals.dbConnection);
    try {
        var obj = vereinDao.update(request.body.id, request.body.name, request.body.musikleitervorname, request.body.musikleiternachname, request.body.anschrift.id, request.body.anzahlMusiker, request.body.besetzung, request.body.mitgliedsnr);
        console.log('Service Verein: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Verein: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/verein/:id', function(request, response) {
    console.log('Service Verein: Client requested deletion of record, id=' + request.params.id);

    const vereinDao = new VereinDao(request.app.locals.dbConnection);
    try {
        var obj = vereinDao.loadById(request.params.id);
        vereinDao.delete(request.params.id);
        console.log('Service Verein: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Verein: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;