import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        pw = await async_api.async_playwright().start()
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )
        context = await browser.new_context()
        context.set_default_timeout(15000)
        page = await context.new_page()
        # -> navigate
        await page.goto("http://localhost:8080/index.html")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Abrir o seletor de perfil (clicar no elemento index 5) para escolher 'Profissional de Saúde'.
        # "Paciente
Cuidador
Profissional de Saúde"
        elem = page.locator("xpath=/html/body/div/div[2]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Preencher o campo 'CPF ou E-mail' com 111.111.111-11, preencher 'Senha' com 123 e enviar o formulário de login.
        # text input placeholder="000.000.000-00 ou email@domini"
        elem = page.locator("xpath=/html/body/div/div[2]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("111.111.111-11")
        
        # -> Preencher o campo 'CPF ou E-mail' com 111.111.111-11, preencher 'Senha' com 123 e enviar o formulário de login.
        # password input placeholder="Sua senha"
        elem = page.locator("xpath=/html/body/div/div[2]/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123")
        
        # -> Preencher o campo 'CPF ou E-mail' com 111.111.111-11, preencher 'Senha' com 123 e enviar o formulário de login.
        # button "Entrar"
        elem = page.locator("xpath=/html/body/div/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open João Silva's clinical record by selecting the patient's card (João Silva).
        # "João Silva
Estável"
        elem = page.locator("xpath=/html/body/div/main/div/div/div/div/div").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Fill the observation textarea and the prescription adjustment textarea, then click 'Salvar e Notificar o Paciente' to save the record.
        # placeholder="Paciente apresenta picos de gl"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[4]/div/textarea").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Observa\u00e7\u00e3o: paciente com picos de glicemia intermitentes nas \u00faltimas 48h; manter monitoramento capilar e refor\u00e7ar orienta\u00e7\u00e3o diet\u00e9tica. Sugerida reavalia\u00e7\u00e3o em 7 dias.")
        
        # -> Fill the observation textarea and the prescription adjustment textarea, then click 'Salvar e Notificar o Paciente' to save the record.
        # placeholder="Ex: Alterar Metformina de 850m"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[4]/div[2]/textarea").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Ajuste de prescri\u00e7\u00e3o: aumentar Metformina de 500mg para 1000mg ao dia (500mg a cada 12h). Monitorar efeitos gastrointestinais e glicemias capilares.")
        
        # -> Fill the observation textarea and the prescription adjustment textarea, then click 'Salvar e Notificar o Paciente' to save the record.
        # button "Salvar e Notificar o Paciente"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[4]/div[3]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Reload the application at /index.html, log in as Dra. Ana if needed, open João Silva's record, and inspect the history area to verify a new conduct entry is present.
        await page.goto("http://localhost:8080/index.html")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Abrir o seletor de perfil e selecionar 'Profissional de Saúde', preencher credenciais da Dra. Ana e submeter o login para acessar o painel clínico.
        # text input placeholder="000.000.000-00 ou email@domini"
        elem = page.locator("xpath=/html/body/div/div[2]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("111.111.111-11")
        
        # -> Abrir o seletor de perfil e selecionar 'Profissional de Saúde', preencher credenciais da Dra. Ana e submeter o login para acessar o painel clínico.
        # password input placeholder="Sua senha"
        elem = page.locator("xpath=/html/body/div/div[2]/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123")
        
        # -> Abrir o seletor de perfil e selecionar 'Profissional de Saúde', preencher credenciais da Dra. Ana e submeter o login para acessar o painel clínico.
        # button "Entrar"
        elem = page.locator("xpath=/html/body/div/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open João Silva's clinical record from the dashboard and inspect the history area to confirm the newly saved conduct entry is present.
        # "João Silva
Estável"
        elem = page.locator("xpath=/html/body/div/main/div/div/div/div/div").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Fill the observation and prescription fields and click 'Salvar e Notificar o Paciente' to create a conduct entry, then inspect the history area.
        # placeholder="Paciente apresenta picos de gl"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[4]/div/textarea").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Observa\u00e7\u00e3o: paciente com picos de glicemia intermitentes nas \u00faltimas 48h; manter monitoramento capilar e refor\u00e7ar orienta\u00e7\u00e3o diet\u00e9tica. Sugerida reavalia\u00e7\u00e3o em 7 dias.")
        
        # -> Fill the observation and prescription fields and click 'Salvar e Notificar o Paciente' to create a conduct entry, then inspect the history area.
        # placeholder="Ex: Alterar Metformina de 850m"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[4]/div[2]/textarea").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Ajuste de prescri\u00e7\u00e3o: aumentar Metformina de 500mg para 1000mg ao dia (500mg a cada 12h). Monitorar efeitos gastrointestinais e glicemias capilares.")
        
        # -> Fill the observation and prescription fields and click 'Salvar e Notificar o Paciente' to create a conduct entry, then inspect the history area.
        # button "Salvar e Notificar o Paciente"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[4]/div[3]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        await asyncio.sleep(5)
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    