const helper = require('../helper.js');

class KomponistDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Komponist WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadByName(name) {
        var sql = 'SELECT * FROM Komponist WHERE name LIKE ?';
        var statement = this._conn.prepare(sql);
        var result = statement.all("%" + name + "%");

        if (helper.isArrayEmpty(result)) 
            return[]
        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Komponist';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Komponist WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(name = '') {
        var sql = 'INSERT INTO Komponist (name) VALUES (?)';
        var statement = this._conn.prepare(sql);
        var params = [name];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, name = '') {
        var sql = 'UPDATE Komponist SET name=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [name, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Komponist WHERE id=?';
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
        console.log('KomponistDao [_conn=' + this._conn + ']');
    }
}

module.exports = KomponistDao;