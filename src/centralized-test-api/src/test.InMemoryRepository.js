const { v4: uuidv4 } = require('uuid')
const tests = [];

module.exports = {
    insertTest: async (body) => {
        const { passed, name, groupId, given, when, then, executionTimeMs, escope, testType, startedDate, endDate } = body;

        const id = uuidv4();
        tests.push({
            id: id,
            name,
            passed,
            groupId,
            given,
            when,
            then,
            executionTimeMs,
            escope,
            testType,
            startedDate,
            endDate
        })

        return id;
    },
    getById: async (id) => {
        return tests.find(test => test?.id == id);
    }
}
