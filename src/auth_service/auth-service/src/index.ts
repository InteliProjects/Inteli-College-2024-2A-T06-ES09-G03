import express, { Request, Response } from 'express';
import { MockService } from './mockService';


const app = express();
app.use(express.json());

type User = { username: string, password: string };
type Session = { username: string, token: string };

const users: User[] = [{ username: 'user1', password: 'pass1' }];
const sessions: Session[] = [];

// Função para gerar tokens simples
const generateToken = (username: string) => `${username}-token-${Date.now()}`;

app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = generateToken(username);
        sessions.push({ username, token });
        return res.json({ token });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/logout', (req: Request, res: Response) => {
    const { username, token } = req.body;
    const sessionIndex = sessions.findIndex(s => s.username === username && s.token === token);
    if (sessionIndex !== -1) {
        sessions.splice(sessionIndex, 1);
        return res.json({ message: 'Logged out successfully' });
    }
    return res.status(401).json({ error: 'Invalid session' });
});

app.post('/authenticate', (req: Request, res: Response) => {
    const { username, token } = req.body;
    const session = sessions.find(s => s.username === username && s.token === token);
    if (session) {
        return res.json({ authenticated: true });
    }
    return res.status(401).json({ authenticated: false });
});


app.get('/health', (req: Request, res: Response) => {
    const healthStatus = MockService.CheckHealth();
    
    if (MockService.simulateFailure) {
        res.status(200).json({ status: 'Degraded', details: healthStatus.details });
        MockService.simulateFailure = false; 
        console.log("passei aqui")
        return;
    }

    if (MockService.primaryDisabled && MockService.CheckRedundancy().status === 'Redundancy Ok') {
        res.json({ status: 'Healthy (Redundant)', details: healthStatus.details });
        MockService.primaryDisabled = false;
        return;
    }

    if (MockService.substitutionActive) {
        res.json({ status: 'Healthy (Substitute)', details: healthStatus.details });
        return;
    }

    if (healthStatus.healthy) {
        res.json({ status: 'Healthy', details: healthStatus.details });
    } else {
        res.status(503).json({ status: 'Degraded', details: healthStatus.details });
    }
});

app.post('/simulate-failure', (req: Request, res: Response) => {
    MockService.simulateFailure = true; 
    res.status(200).json({ status: 'Simulated Failure' });
});

app.post('/disable-primary', (req: Request, res: Response) => {
    MockService.primaryDisabled = true;
    res.status(200).json({ status: 'Primary Disabled' });
});

app.post('/substitute-service', (req: Request, res: Response) => {
    MockService.substitutionActive = true;
    res.status(200).json({ status: 'Substitute Service Active' });
});


app.post('/predict-failures', (req: Request, res: Response) => {
    // Lógica para predição de falhas
    res.json({ prediction: 'High Risk' });
});

app.post('/prevent-failures', (req: Request, res: Response) => {
    // Lógica para prevenção de falhas
    res.json({ action: 'Preventive Action Taken' });
});

app.listen(3001, () => console.log('Auth service running on port 3001'));
