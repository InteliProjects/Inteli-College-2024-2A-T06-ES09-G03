import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { MockService } from './mockService';

const app = express();
app.use(express.json());

const AUTH_SERVICE_URL = 'http://localhost:3001';

// Middleware para verificar autenticação
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { username, token } = req.headers;
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/authenticate`, { username, token });
        if (response.data.authenticated) {
            next();
        } else {
            res.status(401).json({ error: 'Not authenticated' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Not authenticated' });
    }
};

app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, { username, password });
        res.json(response.data);
    } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/logout', async (req: Request, res: Response) => {
    const { username, token } = req.body;
    try {
        await axios.post(`${AUTH_SERVICE_URL}/logout`, { username, token });
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(401).json({ error: 'Invalid session' });
    }
});

app.get('/protected', authenticate, (req: Request, res: Response) => {
    res.json({ message: 'You are authenticated!' });
});

app.post('/volume', (req: Request, res: Response) => {
    const { service } = req.body;
    const result = MockService.GetVolumeDeServicos(service);
    res.json({ result });
});

app.get('/disponibilidade', (req: Request, res: Response) => {
    const available = MockService.CheckDisponibilidade();
    res.json({ available });
});

app.post('/privacidade', (req: Request, res: Response) => {
    const { data } = req.body;
    const result = MockService.CheckPrivacidade(data);
    res.json({ result });
});

app.post('/integridade', (req: Request, res: Response) => {
    const { data } = req.body;
    const result = MockService.CheckIntegridade(data);
    res.json({ result });
});

app.post('/transacao', (req: Request, res: Response) => {
    const { data } = req.body;
    const result = MockService.RegistrarTransacao(data);
    res.json({ result });
});

// app.get('/health', (req: Request, res: Response) => {
//     const healthStatus = MockService.CheckHealth();
//     if (healthStatus.healthy) {
//         res.json({ status: 'Service is healthy', details: healthStatus.details });
//     } else {
//         res.status(503).json({ status: 'Service is unhealthy', details: healthStatus.details });
//     }
// });

// app.get('/redundancy', (req: Request, res: Response) => {
//     const redundancyStatus = MockService.CheckRedundancy();
//     res.json(redundancyStatus);
// });

// app.get('/replace', (req: Request, res: Response) => {
//     const replacementStatus = MockService.ReplaceInstance();
//     res.json(replacementStatus);
// });

// app.get('/predict', (req: Request, res: Response) => {
//     const predictionStatus = MockService.PredictAndPrevent();
//     res.json(predictionStatus);
// });


app.listen(3000, () => console.log('Web app running on port 3000'));
