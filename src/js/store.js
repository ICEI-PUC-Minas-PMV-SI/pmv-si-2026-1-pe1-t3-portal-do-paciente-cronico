// js/store.js
// Camada de Dados Multi-Usuário (Mock e LocalStorage)

class Store {
    constructor() {
        this.init();
    }

    init() {
        // Banco de Dados Hardcoded para MVP (injetado automaticamente para todo o grupo conseguir testar)
        let defaultUsers = [
            { id: 101, name: 'João Silva', cpf: '123.456.789-00', password: '123', profile: 'paciente', birthDate: '1960-05-15', sex: 'M', bloodType: 'A+', allergies: 'Nenhuma', conditions: ['Diabetes', 'Hipertensão'] },
            { id: 102, name: 'Alan Cuidador', cpf: '477.447.980-23', password: '123', profile: 'cuidador', linkedPatientId: 101 },
            { id: 103, name: 'Dra. Ana', cpf: '111.111.111-11', password: '123', profile: 'medico', crm: '12345-MG' },
            { id: 104, name: 'Maria Souza', cpf: '987.654.321-00', password: '123', profile: 'paciente', birthDate: '1980-10-20', sex: 'F', bloodType: 'O-', allergies: 'Dipirona', conditions: ['Asma'] }
        ];

        let users = JSON.parse(localStorage.getItem('ppc_users')) || [];
        
        // Se o CPF teste já existir (de um teste antigo), garantimos que a senha seja '123' para a demonstração não falhar
        defaultUsers.forEach(defUser => {
            const cleanDefCpf = String(defUser.cpf).replace(/\\D/g, '');
            const existingIndex = users.findIndex(u => String(u.cpf).replace(/\\D/g, '') === cleanDefCpf);
            
            if (existingIndex === -1) {
                users.push(defUser);
            } else {
                // Força a atualização da senha, perfil, e principalmente ID para ligar com a base rica abaixo
                users[existingIndex].password = '123';
                users[existingIndex].profile = defUser.profile;
                users[existingIndex].id = defUser.id;
                if (defUser.linkedPatientId) {
                    users[existingIndex].linkedPatientId = defUser.linkedPatientId;
                }
            }
        });
        localStorage.setItem('ppc_users', JSON.stringify(users));

        // Sincronizar o usuário logado atualmente (evita que a tela use o ID antigo após recarregar)
        let currentUser = JSON.parse(localStorage.getItem('ppc_currentUser'));
        if (currentUser && currentUser.cpf) {
            let updatedUser = users.find(u => String(u.cpf).replace(/\\D/g, '') === String(currentUser.cpf).replace(/\\D/g, ''));
            if (updatedUser) {
                localStorage.setItem('ppc_currentUser', JSON.stringify(updatedUser));
            }
        }

        // Injeta dados clínicos ricos para os pacientes para testes em grupo visuais
        let data = JSON.parse(localStorage.getItem('ppc_data')) || {};
        
        // Forçamos a rescrita do Paciente 1 independente do log anterior para popular os gráficos perfeitamente
        // Calcula timestamps baseados em agora para garantir uma ordenação perfeita, independente da string de data
        const now = Date.now();
        const DayMs = 86400000;
        
        data[101] = { 
            medications: [
                {id: 1, name: 'Losartana', frequency: 'A cada 12h', firstDose: '08:00', dosage: '50mg', warning: false},
                {id: 2, name: 'Metformina', frequency: 'A cada 8h', firstDose: '06:00', dosage: '500mg', warning: false},
                {id: 3, name: 'Sinvastatina', frequency: 'A cada 24h', firstDose: '22:00', dosage: '20mg', warning: false}
            ], 
            vitals: { 
                pressure: [
                    {date: '10 abr.', time: '08:00', sys: 130, dia: 85, timestamp: now - 4*DayMs},
                    {date: '11 abr.', time: '07:30', sys: 125, dia: 80, timestamp: now - 3*DayMs},
                    {date: '12 abr.', time: '08:15', sys: 140, dia: 90, timestamp: now - 2*DayMs},
                    {date: '13 abr.', time: '08:00', sys: 135, dia: 85, timestamp: now - 1*DayMs},
                    {date: '14 abr.', time: '07:45', sys: 120, dia: 80, timestamp: now - 2000000}
                ], 
                glycemia: [
                    {date: '08/04', time: '07:00', value: 115, timestamp: now - 6*DayMs},
                    {date: '09/04', time: '07:00', value: 142, timestamp: now - 5*DayMs},
                    {date: '10/04', time: '07:00', value: 110, timestamp: now - 4*DayMs},
                    {date: '11/04', time: '07:00', value: 125, timestamp: now - 3*DayMs},
                    {date: '12/04', time: '07:00', value: 105, timestamp: now - 2*DayMs},
                    {date: '13/04', time: '07:00', value: 130, timestamp: now - 1*DayMs},
                    {date: '14/04', time: '07:00', value: 95, timestamp: now - 1000000}
                ], 
                history: [], 
                symptoms: [
                    {date: '12 abr.', time: '14:30', description: 'Tontura, Dor de cabeça - Tive bastante enjoô após o almoço...', timestamp: now - 2*DayMs + 1000},
                    {date: '14 abr.', time: '09:00', description: 'Cansaço leve pela manhã', timestamp: now - 500000}
                ] 
            } 
        };
        
        if (!data[104]) {
            data[104] = { medications: [], vitals: { pressure: [], glycemia: [], history: [], symptoms: [] } };
        }
        localStorage.setItem('ppc_data', JSON.stringify(data));
    }

    // --- Autenticação e Perfis ---

    registerUser(name, cpf, profile, additionalData = {}) {
        const users = JSON.parse(localStorage.getItem('ppc_users'));
        const newUser = { 
            id: Date.now(), 
            name, 
            cpf, 
            profile,
            birthDate: additionalData.birthDate || '',
            sex: additionalData.sex || '',
            bloodType: additionalData.bloodType || '',
            allergies: additionalData.allergies || '',
            crm: additionalData.crm || '',
            password: additionalData.password || '',
            conditions: additionalData.conditions || []
        };
        users.push(newUser);
        localStorage.setItem('ppc_users', JSON.stringify(users));
        
        // Cria estrutura abstrata de dados 
        const data = JSON.parse(localStorage.getItem('ppc_data')) || {};
        data[newUser.id] = { medications: [], vitals: { pressure: [], glycemia: [], history: [] } };
        localStorage.setItem('ppc_data', JSON.stringify(data));
        
        this.loginUser(newUser);
        return newUser;
    }

    loginUserByCpf(cpf, password) {
        const users = JSON.parse(localStorage.getItem('ppc_users')) || [];
        let user = users.find(u => {
            const uCpf = String(u.cpf || '').replace(/\D/g, '');
            const inputCpf = String(cpf || '').replace(/\D/g, '');
            return uCpf === inputCpf && String(u.password || '').trim() === String(password || '').trim();
        });
        
        if(user) {
            this.loginUser(user);
        }
        return user;
    }

    loginUser(user) {
        localStorage.setItem('ppc_currentUser', JSON.stringify(user));
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('ppc_currentUser')) || { id: 1, name: 'João Aparecido', profile: 'paciente' };
    }

    getActivePatientId() {
        const user = this.getCurrentUser();
        if (user.profile === 'cuidador' && user.linkedPatientId) {
            return user.linkedPatientId;
        }
        return user.id;
    }

    getPatientUser() {
        const targetId = this.getActivePatientId();
        const users = JSON.parse(localStorage.getItem('ppc_users')) || [];
        return users.find(u => u.id === targetId) || this.getCurrentUser();
    }

    updatePatientBasicData(id, updateData) {
        let users = JSON.parse(localStorage.getItem('ppc_users')) || [];
        const index = users.findIndex(u => u.id === id);
        if(index > -1) {
            users[index] = { ...users[index], ...updateData };
            // Se o usuário atual for ele, reflete a mudança no currentUser também para UX imediata
            const currentUser = this.getCurrentUser();
            if(currentUser.id === id) {
                this.loginUser(users[index]);
            }
            localStorage.setItem('ppc_users', JSON.stringify(users));
            return true;
        }
        return false;
    }

    getCaregivers() {
        const user = this.getCurrentUser();
        const users = JSON.parse(localStorage.getItem('ppc_users')) || [];
        return users.filter(u => u.profile === 'cuidador' && u.linkedPatientId === user.id);
    }

    registerCaregiver(name, cpf, password) {
        const user = this.getCurrentUser();
        const users = JSON.parse(localStorage.getItem('ppc_users')) || [];
        
        // Verifica se já existe limpando a formatação
        const cleanCpf = String(cpf || '').replace(/\D/g, '');
        const existingIndex = users.findIndex(u => String(u.cpf || '').replace(/\D/g, '') === cleanCpf);
        
        if (existingIndex > -1) {
            // Se o cuidador já existir no sistema, atualizamos a senha dele (recuperação forçada/edição pelo paciente)
            users[existingIndex].password = password;
            users[existingIndex].name = name;
            users[existingIndex].profile = 'cuidador';
            users[existingIndex].linkedPatientId = user.id;
            localStorage.setItem('ppc_users', JSON.stringify(users));
            return true;
        }

        const newUser = {
            id: Date.now(),
            name, cpf, password, profile: 'cuidador', linkedPatientId: user.id
        };
        users.push(newUser);
        localStorage.setItem('ppc_users', JSON.stringify(users));
        return true;
    }

    deleteCaregiver(id) {
        let users = JSON.parse(localStorage.getItem('ppc_users')) || [];
        users = users.filter(u => u.id !== id);
        localStorage.setItem('ppc_users', JSON.stringify(users));
        return true;
    }

    // --- Visão do Médico (Busca multi paciente) ---

    getAllPatients() {
        const users = JSON.parse(localStorage.getItem('ppc_users'));
        return users.filter(u => u.profile === 'paciente');
    }

    getPatientData(userId) {
        const data = JSON.parse(localStorage.getItem('ppc_data')) || {};
        return data[userId] || { medications: [], vitals: { pressure: [], glycemia: [] } };
    }
    
    savePatientData(userId, patientData) {
        const data = JSON.parse(localStorage.getItem('ppc_data')) || {};
        data[userId] = patientData;
        localStorage.setItem('ppc_data', JSON.stringify(data));
    }

    // --- Ações do Paciente (Contexto baseado no getActivePatientId) ---

    getMedications() {
        return this.getPatientData(this.getActivePatientId()).medications;
    }

    addMedication(med) {
        const targetId = this.getActivePatientId();
        const pData = this.getPatientData(targetId);
        med.id = Date.now();
        pData.medications.push(med);
        this.savePatientData(targetId, pData);
    }

    updateMedication(id, updatedMed) {
        const targetId = this.getActivePatientId();
        const pData = this.getPatientData(targetId);
        const index = pData.medications.findIndex(m => m.id === id);
        if(index > -1) {
            pData.medications[index] = { ...pData.medications[index], ...updatedMed };
            this.savePatientData(targetId, pData);
        }
    }

    deleteMedication(id) {
        const targetId = this.getActivePatientId();
        const pData = this.getPatientData(targetId);
        pData.medications = pData.medications.filter(m => m.id !== id);
        this.savePatientData(targetId, pData);
    }
    
    getVitals() {
        const data = this.getPatientData(this.getActivePatientId()).vitals;
        if (!data.history) data.history = []; // Backward compatibility handler
        if (!data.symptoms) data.symptoms = []; // Backward compatibility handler
        return data;
    }

    addSymptom(description) {
        const targetId = this.getActivePatientId();
        const pData = this.getPatientData(targetId);
        if (!pData.vitals.symptoms) pData.vitals.symptoms = [];
        const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
        const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        pData.vitals.symptoms.push({ date: today, time: time, timestamp: Date.now(), description });
        this.savePatientData(targetId, pData);
    }

    addHistoryRecord(title, fileLabel) {
        const targetId = this.getActivePatientId();
        const pData = this.getPatientData(targetId);
        if (!pData.vitals.history) pData.vitals.history = [];
        const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
        const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        pData.vitals.history.push({ date: today, time: time, timestamp: Date.now(), title, fileLabel });
        this.savePatientData(targetId, pData);
    }

    addPressure(sys, dia) {
        const targetId = this.getActivePatientId();
        const pData = this.getPatientData(targetId);
        const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
        const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        pData.vitals.pressure.push({ date: today, time: time, timestamp: Date.now(), sys: parseInt(sys), dia: parseInt(dia) });
        this.savePatientData(targetId, pData);
    }

    addGlycemia(value) {
        const targetId = this.getActivePatientId();
        const pData = this.getPatientData(targetId);
        const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
        const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        pData.vitals.glycemia.push({ date: today, time: time, timestamp: Date.now(), value: parseInt(value) });
        this.savePatientData(targetId, pData);
    }
}

// Inicializa Globalmente
window.appStore = new Store();
