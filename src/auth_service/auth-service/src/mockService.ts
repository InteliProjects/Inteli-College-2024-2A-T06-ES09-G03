export class MockService {

// Propriedades estáticas para manter o estado do serviço
static simulateFailure: boolean = false;
static primaryDisabled: boolean = false;
static substitutionActive: boolean = false;

static CheckHealth() {
    // Verifica simulações de falha
    if (this.simulateFailure) {
        return {
            healthy: false,
            details: {
                database: 'Down',
                externalAPI: 'Degraded'
            }
        };
    }

    const dbStatus = Math.random() > 0.1;
    const apiStatus = Math.random() > 0.2;

    return {
        healthy: dbStatus && apiStatus,
        details: {
            database: dbStatus ? 'Operational' : 'Down',
            externalAPI: apiStatus ? 'Operational' : 'Degraded'
        }
    };
}

static triggerSimulateFailure() {  
    this.simulateFailure = true; // Atualiza a variável para simular falha
    return { status: 'Simulated Failure' };
}

static CheckRedundancy() {
    const instances = ['Instance1', 'Instance2', 'Instance3'];
    const availableInstances = instances.filter(() => Math.random() > 0.3); // 70% de chance de cada instância estar ok

    return {
        status: availableInstances.length > 0 ? 'Redundancy Ok' : 'No redundancy available',
        availableInstances
    };
}

static ReplaceInstance() {
    const isReplaced = Math.random() > 0.5; // 50% de chance de substituição bem-sucedida

    return {
        status: isReplaced ? 'Replacement Successful' : 'Replacement Failed',
        instance: isReplaced ? 'BackupInstance1' : 'None'
    };
}

static PredictAndPrevent() {
    const cpuUsage = Math.random() * 100;
    const memoryUsage = Math.random() * 100;
    const preventAction = cpuUsage > 80 || memoryUsage > 80;

    return {
        status: preventAction ? 'Preventive Action Taken' : 'System Stable',
        metrics: {
            cpuUsage: `${cpuUsage.toFixed(2)}%`,
            memoryUsage: `${memoryUsage.toFixed(2)}%`
        }
    };
  }
}
  