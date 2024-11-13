import pytest
import requests
from datetime import datetime

def pytest_runtest_logreport(report):
    if report.when == 'call':
        dados = {
            'passed': report.outcome == 'passed',
            'name': report.nodeid,
            'groupId': 1,
            'given': '',
            'when': '',
            'then': '',
            'escope': 'news',
            'testType': 'integration',
            'executionTimeMs': (report.duration * 100),
            'startDate': datetime.now().strftime('%Y-%m-%d'),
            'endDate': datetime.now().strftime('%Y-%m-%d')
        }

        requests.post('http://localhost:3000/v1/test', json = dados);

        if report.outcome == 'failed':
            print('Teste Falhou. Enviando para malha fechada: ', report.nodeid);