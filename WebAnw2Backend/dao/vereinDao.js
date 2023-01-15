const helper = require('../helper.js');
const AnschriftDao = require('./anschriftDao.js');

class VereinDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const anschriftDao = new AnschriftDao(this._conn);

        var sql = 'SELECT * FROM Verein WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result.anschrift = anschriftDao.loadById(result.anschrift_id);
        delete result.anschrift_id;

        return result;
    }

    loadAll() {
        const anschriftDao = new AnschriftDao(this._conn);

        var sql = 'SELECT * FROM Verein';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            result[i].anschrift = anschriftDao.loadById(result[i].anschrift_id);
            delete result[i].anschrift_id;
        }

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Verein WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(name = '', musikleitervorname = '', musikleiternachname = '', anschriftId = 0, anzahlMusiker = 0, besetzung = 'standard', mitgliedsnr = 0) {
        var sql = 'INSERT INTO Verein (name, musikleitervorname, musikleiternachname, anschrift_id, anzahlMusiker, besetzung, mitgliedsnr) VALUES (?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [name,musikleitervorname, musikleiternachname, anschriftId, anzahlMusiker, besetzung, mitgliedsnr];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, name = '', musikleitervorname = '', musikleiternachname = '', anschriftId = 0, anzahlMusiker = 0, besetzung = 'standard', mitgliedsnr = 0) {
        var sql = 'UPDATE Verein SET name=?,musikleitervorname=?,musikleiternachname=?,anschrift_id=?,anzahlMusiker=?,besetzung=?, mitgliedsnr=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [name, musikleitervorname, musikleiternachname, anschriftId, anzahlMusiker, besetzung,mitgliedsnr, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Verein WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('VereinDao [_conn=' + this._conn + ']');
    }
}

module.exports = VereinDao;