// js/auth.js
// Lógica de Autenticação Reestruturada

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------- Lógica Index (Login) -----------
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            const profileSelected = document.getElementById('login-profile').value;
            const cpf = document.getElementById('cpf').value.trim();
            const password = document.getElementById('password') ? document.getElementById('password').value.trim() : '';
            
            if (!cpf || !password) {
                alert("Por favor, preencha seu CPF e senha.");
                return;
            }

            btnLogin.innerHTML = 'Entrando...';
            btnLogin.style.opacity = '0.7';
            
            setTimeout(() => {
                let user;
                if (profileSelected === 'medico') {
                    // Se for Médico, mockamos fixo
                    user = { id: 999, name: 'Dr. Roberto', profile: 'medico' };
                    appStore.loginUser(user);
                    window.location.href = './pages/clinical-dashboard.html';
                } else {
                    // Cadastra ou recupera
                    user = appStore.loginUserByCpf(cpf, password);
                    if (!user || user.profile !== profileSelected) {
                        alert("Cadastro não encontrado, senha incorreta ou perfil selecionado errado (você selecionou '" + profileSelected + "').");
                        btnLogin.innerHTML = 'Entrar <i data-lucide="arrow-right"></i>';
                        btnLogin.style.opacity = '1';
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                        return;
                    }
                    
                    appStore.loginUser(user);
                    window.location.href = './pages/dashboard.html';
                }
            }, 600);
        });
    }

    // ----------- Lógica Register (Cadastro) -----------
    const btnRegister = document.getElementById('btn-register');
    
    if (btnRegister) {
        btnRegister.addEventListener('click', () => {
            const selectedRadio = document.querySelector('input[name="reg-profile"]:checked');
            const profile = selectedRadio ? selectedRadio.value : 'paciente';
            const cpf = document.getElementById('reg-cpf').value;
            const password = document.getElementById('reg-password').value;
            const btnTextElement = document.getElementById('btn-register-text');

            if (profile === 'cuidador') {
                if (!cpf || !password) {
                    alert("Por favor, preencha o CPF e a senha que o paciente cadastrou para você.");
                    return;
                }
                const user = appStore.loginUserByCpf(cpf, password);
                if (!user || user.profile !== 'cuidador') {
                    alert("Acesso negado. CPF não registrado como cuidador ou senha inválida.");
                    return;
                }
                btnTextElement.innerText = 'Autenticando...';
                appStore.loginUser(user);
                setTimeout(() => window.location.href = './pages/dashboard.html', 800);
                return;
            }

            const name = document.getElementById('reg-name').value;
            const crm = document.getElementById('reg-crm') ? document.getElementById('reg-crm').value : '';
            
            // Novos campos
            const birthDate = document.getElementById('reg-birth') ? document.getElementById('reg-birth').value : '';
            const sex = document.getElementById('reg-sex') ? document.getElementById('reg-sex').value : '';
            const bloodType = document.getElementById('reg-blood') ? document.getElementById('reg-blood').value : '';
            const allergies = document.getElementById('reg-allergies') ? document.getElementById('reg-allergies').value : '';
            const conditionChecks = document.querySelectorAll('.cond-check:checked');
            const conditions = Array.from(conditionChecks).map(cb => cb.value);
            const lgpd = document.getElementById('reg-lgpd') ? document.getElementById('reg-lgpd').checked : true;

            if (selectedRadio && name && cpf && password) {
                if (password.length < 4) {
                    alert("A senha é muito fraca. Digite pelo menos 4 caracteres.");
                    return;
                }
                if (!lgpd) {
                    alert("Para utilizar a plataforma, é obrigatório aceitar os termos da LGPD.");
                    return;
                }
                btnTextElement.innerText = 'Criando Conta...';
                
                // Registra de fato no banco falso com os dados extras e a senha
                appStore.registerUser(name, cpf, profile, { birthDate, sex, conditions, bloodType, allergies, password, crm });
                
                setTimeout(() => {
                    if (profile === 'medico') {
                        window.location.href = './pages/clinical-dashboard.html';
                    } else {
                        window.location.href = './pages/dashboard.html';
                    }
                }, 800);
            } else {
                alert("Preencha todos os campos do cadastro, incluindo a senha.");
            }
        });
    }

    // ----------- Lógica de Recuperação de Senha (MVP) -----------
    window.recoverPassword = function(event) {
        event.preventDefault();
        const cpf = prompt("Por favor, digite o seu CPF para recuperação:");
        if (cpf) {
            const users = JSON.parse(localStorage.getItem('ppc_users')) || [];
            let userIndex = users.findIndex(u => u.cpf === cpf);
            
            if (userIndex > -1) {
                const userName = users[userIndex].name.split(' ')[0];
                const newPassword = prompt(`Conta localizada para ${userName}.\nDigite a sua nova senha (mínimo 4 caracteres):`);
                
                if (newPassword && newPassword.length >= 4) {
                    users[userIndex].password = newPassword;
                    localStorage.setItem('ppc_users', JSON.stringify(users));
                    alert("A sua senha foi atualizada com sucesso! Você já pode fazer o login.");
                } else if (newPassword) {
                    alert("A senha deve ter pelo menos 4 caracteres. Operação cancelada.");
                }
            } else {
                alert("CPF não encontrado em nossa base de dados. Verifique os dados digitados.");
            }
        }
    };
});
