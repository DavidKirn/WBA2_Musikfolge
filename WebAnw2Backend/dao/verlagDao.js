const helper = require('../helper.js');

class VerlagDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Verlag WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadByName(name) {
        var sql = 'SELECT * FROM Verlag WHERE name LIKE ?';
        var statement = this._conn.prepare(sql);
        var result = statement.all("%" + name + "%");

        if (helper.isArrayEmpty(result)) 
            return []; 

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Verlag';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Verlag WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(name = '') {
        var sql = 'INSERT INTO Verlag (name) VALUES (?)';
        var statement = this._conn.prepare(sql);
        var params = [name];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, name = '') {
        var sql = 'UPDATE Verlag SET name=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [name, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Verlag WHERE id=?';
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
        console.log('VerlagDao [_conn=' + this._conn + ']');
    }
}

module.exports = VerlagDao;