const helper = require('../helper.js');
const VerlagDao = require('../dao/verlagDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Verlag');

serviceRouter.get('/verlag/gib/:id', function(request, response) {
    console.log('Service Verlag: Client requested one record, id=' + request.params.id);

    const verlagDao = new VerlagDao(request.app.locals.dbConnection);
    try {
        var obj = verlagDao.loadById(request.params.id);
        console.log('Service Verlag: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Verlag: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/verlag/such/:name', function(request, response) {
    console.log('Service Verlag: Client requested one record, name=' + request.params.name);

    const verlagDao = new VerlagDao(request.app.locals.dbConnection);
    try {
        var obj = verlagDao.loadByText(request.params.name);
        console.log('Service Verlag: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Verlag: Error loading searched records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/verlag/alle', function(request, response) {
    console.log('Service Verlag: Client requested all records');

    const verlagDao = new VerlagDao(request.app.locals.dbConnection);
    try {
        var arr = verlagDao.loadAll();
        console.log('Service Verlag: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Verlag: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/verlag/existiert/:id', function(request, response) {
    console.log('Service Verlag: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const verlagDao = new VerlagDao(request.app.locals.dbConnection);
    try {
        var exists = verlagDao.exists(request.params.id);
        console.log('Service Verlag: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Verlag: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/verlag', function(request, response) {
    console.log('Service Verlag: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Verlag: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const verlagDao = new VerlagDao(request.app.locals.dbConnection);
    try {
        var obj = verlagDao.create(request.body.name);
        console.log('Service Verlag: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Verlag: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/verlag', function(request, response) {
    console.log('Service Verlag: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push('name fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Verlag: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const verlagDao = new VerlagDao(request.app.locals.dbConnection);
    try {
        var obj = verlagDao.update(request.body.id, request.body.name);
        console.log('Service Verlag: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Verlag: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/verlag/:id', function(request, response) {
    console.log('Service Verlag: Client requested deletion of record, id=' + request.params.id);

    const verlagDao = new VerlagDao(request.app.locals.dbConnection);
    try {
        var obj = verlagDao.loadById(request.params.id);
        verlagDao.delete(request.params.id);
        console.log('Service Verlag: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Verlag: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;