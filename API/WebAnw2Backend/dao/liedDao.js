const helper = require('../helper.js');

class LiedDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = 'SELECT * FROM Lied WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {

        var sql = 'SELECT * FROM Lied';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

            result[i].zeitpunkt = helper.formatToGermanDateTime(helper.parseSQLDateTimeString(result[i].zeitpunkt));
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Lied WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(titel='', komponist_id=0, bearbeiterid=0, verlagid=0) {
        var sql = 'INSERT INTO Lied (titel, komponistid, bearbeiterid, verlagid ) VALUES (?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [titel, komponistid, bearbeiterid, verlagid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, titel='', komponistid=0, bearbeiterid=0, verlagid=0) {

        var sql = 'UPDATE Lied SET titel=?, komponisid=?, bearbeiterid=?, verlagid=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [titel, komponistid, bearbeiterid, verlagid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {

            var sql = 'DELETE FROM Lied WHERE id=?';
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
        console.log('LiedDao [_conn=' + this._conn + ']');
    }
}

module.exports = LiedDao;