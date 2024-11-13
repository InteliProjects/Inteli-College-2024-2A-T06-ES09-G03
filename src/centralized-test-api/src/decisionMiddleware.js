const escopesCounter = require('./escopesCounterMemoryRepository')

module.exports = function decisionHandlerMiddleware(req, res, next) {
    const { passed, escope } = req.body;

    // Caso não possuir o atributo escope, não aplica ações
    if(!escope) {
        return next();
    }

    // Caso o teste passar, garante que a contagem de erros do escopo seja 0
    if(passed){
        escopesCounter.updateById(escope, 0);
        return next();
    }

    // Obtem a quantidade atual de erros do escopo e adiciona um
    const escopeCount = (escopesCounter.getById(escope) || 0)  +  1;
    escopesCounter.updateById(escope, escopeCount);

    // Caso a quantidade atualizada de erros do escopo for menor que 2, não precisa tomar ação
    if(escopeCount < 2) {
        return next();
    }

    // Caso a quantidade atualizada de erros do escopo for maior ou igual a 2, o sistema pode tomar ação
    console.log(`Escope ${escope} hasnt pass a test ${escopeCount} times. Calling to use secondary API`)
    next();
    
}