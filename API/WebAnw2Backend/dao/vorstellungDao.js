const helper = require('../helper.js');

class VeranstaltungDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = 'SELECT * FROM Veranstaltung WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {

        var sql = 'SELECT * FROM Veranstaltung';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

            result[i].zeitpunkt = helper.formatToGermanDateTime(helper.parseSQLDateTimeString(result[i].zeitpunkt));
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Veranstaltung WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(name = '', musikleitervorname='', musikleiternachname='', anschriftId=0, anzahlMusiker=0, besetzung='', mitgliedsnr=0) {
        var sql = 'INSERT INTO Veranstaltung (name, musikleitervorname, musikleiternachname, anschriftId, anzahlMusiker, besetzung, mitgliedsnr) VALUES (?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [name, musikleitervorname, musikleiternachname, anschriftId, anzahlMusiker, besetzung, mitgliedsnr];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, name = '', musikleitervorname='', musikleiternachname='', anschriftId=0, anzahlMusiker=0, besetzung='', mitgliedsnr=0) {

        var sql = 'UPDATE Veranstaltung SET name=?, musikleitervorname=?, musikleiternachname=?, anschriftId=?, anzahlMusiker=?, besetzung=?, mitgliedsnr=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [name, musikleitervorname, musikleiternachname, anschriftId, anzahlMusiker, besetzung,mitgliedsnr];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {

            var sql = 'DELETE FROM Veranstaltung WHERE id=?';
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
        console.log('VeranstaltungDao [_conn=' + this._conn + ']');
    }
}

module.exports = VeranstaltungDao;