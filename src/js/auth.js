// js/auth.js
// Lógica de Autenticação Reestruturada

document.addEventListener('DOMContentLoaded', () => {

    const notify = (msg, type) => (typeof showToast === 'function' ? showToast(msg, type) : alert(msg));

    // ----------- Lógica Index (Login) -----------
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            const profileSelected = document.getElementById('login-profile').value;
            const cpf = document.getElementById('cpf').value.trim();
            const password = document.getElementById('password') ? document.getElementById('password').value.trim() : '';

            if (!cpf || !password) {
                notify("Por favor, preencha seu CPF e senha.", 'error');
                return;
            }

            btnLogin.innerHTML = 'Entrando...';
            btnLogin.style.opacity = '0.7';

            setTimeout(() => {
                const user = appStore.loginUserByCpf(cpf, password);
                if (!user || user.profile !== profileSelected) {
                    notify("Cadastro não encontrado, senha incorreta ou perfil errado.", 'error');
                    btnLogin.innerHTML = 'Entrar <i data-lucide="arrow-right"></i>';
                    btnLogin.style.opacity = '1';
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                    return;
                }

                if (user.profile === 'medico') {
                    window.location.href = './pages/clinical-dashboard.html';
                } else {
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
                    notify("Preencha o CPF e a senha cadastrados pelo paciente.", 'error');
                    return;
                }
                const user = appStore.loginUserByCpf(cpf, password);
                if (!user || user.profile !== 'cuidador') {
                    notify("Acesso negado. CPF não registrado como cuidador ou senha inválida.", 'error');
                    return;
                }
                btnTextElement.innerText = 'Autenticando...';
                appStore.loginUser(user);
                setTimeout(() => window.location.href = './pages/dashboard.html', 800);
                return;
            }

            const name = document.getElementById('reg-name').value;
            const crm = document.getElementById('reg-crm') ? document.getElementById('reg-crm').value : '';

            const birthDate = document.getElementById('reg-birth') ? document.getElementById('reg-birth').value : '';
            const sex = document.getElementById('reg-sex') ? document.getElementById('reg-sex').value : '';
            const bloodType = document.getElementById('reg-blood') ? document.getElementById('reg-blood').value : '';
            const allergies = document.getElementById('reg-allergies') ? document.getElementById('reg-allergies').value : '';
            const conditionChecks = document.querySelectorAll('.cond-check:checked');
            const conditions = Array.from(conditionChecks).map(cb => cb.value);
            const lgpd = document.getElementById('reg-lgpd') ? document.getElementById('reg-lgpd').checked : true;

            if (selectedRadio && name && cpf && password) {
                if (password.length < 4) {
                    notify("Senha muito fraca. Use ao menos 4 caracteres.", 'error');
                    return;
                }
                if (String(cpf).replace(/\D/g, '').length !== 11) {
                    notify("CPF inválido. Deve conter 11 dígitos.", 'error');
                    return;
                }
                if (!lgpd) {
                    notify("É obrigatório aceitar os termos da LGPD.", 'error');
                    return;
                }
                btnTextElement.innerText = 'Criando Conta...';

                const result = appStore.registerUser(name, cpf, profile, { birthDate, sex, conditions, bloodType, allergies, password, crm });

                if (result && result.error) {
                    notify(result.message || 'Não foi possível concluir o cadastro.', 'error');
                    btnTextElement.innerText = 'Cadastrar';
                    return;
                }

                setTimeout(() => {
                    if (profile === 'medico') {
                        window.location.href = './pages/clinical-dashboard.html';
                    } else {
                        window.location.href = './pages/dashboard.html';
                    }
                }, 800);
            } else {
                notify("Preencha todos os campos do cadastro, incluindo a senha.", 'error');
            }
        });
    }

    // ----------- Recuperação de Senha (MVP) -----------
    // NOTE: em produção, este fluxo deve usar e-mail/SMS verificado.
    // Como o app é offline (localStorage), aceitamos a redefinição mediante
    // confirmação do CPF + data de nascimento cadastrados.
    window.recoverPassword = function(event) {
        event.preventDefault();
        const cpf = prompt("Digite o seu CPF para recuperação:");
        if (!cpf) return;
        const cleanInput = String(cpf).replace(/\D/g, '');
        const users = JSON.parse(localStorage.getItem('ppc_users')) || [];
        const userIndex = users.findIndex(u => String(u.cpf || '').replace(/\D/g, '') === cleanInput);

        if (userIndex === -1) {
            notify("CPF não encontrado.", 'error');
            return;
        }

        const target = users[userIndex];
        // Para usuários que tenham birthDate cadastrado, exigimos a data como prova.
        if (target.birthDate) {
            const provided = prompt("Para confirmar, digite sua data de nascimento (AAAA-MM-DD):");
            if (!provided || provided.trim() !== target.birthDate) {
                notify("Dados não conferem. Operação cancelada.", 'error');
                return;
            }
        }

        const newPassword = prompt(`Conta localizada para ${target.name.split(' ')[0]}.\nDigite a NOVA senha (mínimo 4 caracteres):`);
        if (!newPassword) return;
        if (newPassword.length < 4) {
            notify("A senha deve ter pelo menos 4 caracteres.", 'error');
            return;
        }
        users[userIndex].password = newPassword;
        localStorage.setItem('ppc_users', JSON.stringify(users));
        notify("Senha atualizada com sucesso! Faça login.", 'success');
    };
});
