const escopeCounter = {};

module.exports = {
    getAll() {
        return escopeCounter;
    },
    insertTest: (id, body) => {
        escopeCounter[id] = body;
    },
    getById: (id) => {
        return escopeCounter[id];
    },
    updateById:(id, body) => {
        return escopeCounter[id] = body;
    }
}
