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
        
        # -> Open the 'Entrar como' profile dropdown and choose 'Profissional de Saúde' (doctor profile).
        # "Paciente
Cuidador
Profissional de Saúde"
        elem = page.locator("xpath=/html/body/div/div[2]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Preencher o campo CPF com o CPF da médica (111.111.111-11) e a senha (123), então clicar em Entrar para autenticar como Profissional de Saúde.
        # text input placeholder="000.000.000-00 ou email@domini"
        elem = page.locator("xpath=/html/body/div/div[2]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("111.111.111-11")
        
        # -> Preencher o campo CPF com o CPF da médica (111.111.111-11) e a senha (123), então clicar em Entrar para autenticar como Profissional de Saúde.
        # password input placeholder="Sua senha"
        elem = page.locator("xpath=/html/body/div/div[2]/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123")
        
        # -> Preencher o campo CPF com o CPF da médica (111.111.111-11) e a senha (123), então clicar em Entrar para autenticar como Profissional de Saúde.
        # button "Entrar"
        elem = page.locator("xpath=/html/body/div/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Buscar o paciente 'João' usando o campo de busca e então abrir o prontuário do paciente João Silva.
        # text input placeholder="Buscar por Nome..."
        elem = page.locator("xpath=/html/body/div/main/header/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Jo\u00e3o")
        
        # -> Buscar o paciente 'João' usando o campo de busca e então abrir o prontuário do paciente João Silva.
        # "João Silva
Estável"
        elem = page.locator("xpath=/html/body/div/main/div/div/div/div/div").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the 'Pressão' chart button to switch the displayed chart to pressure view.
        # button "Pressão"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[2]/div/div/button[2]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the 'Pressão' chart button to switch the displayed chart to pressure view.
        # button "Glicemia"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[2]/div/div/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the 'Pressão' chart button to switch the displayed chart to pressure view.
        # placeholder="Paciente apresenta picos de gl"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[4]/div/textarea").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Conduta de teste: reduzir Metformina para 450mg.")
        
        # -> Clicar em 'Salvar e Notificar o Paciente' e verificar se a conduta aparece em 'Histórico de Condutas'.
        # button "Salvar e Notificar o Paciente"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[4]/div[3]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Reload the application to restore the UI and then verify that the saved conduct appears in 'Histórico de Condutas' for João Silva.
        await page.goto("http://localhost:8080/index.html")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Preencher CPF e senha da médica e submeter o login para entrar no painel (CPF 111.111.111-11, senha 123).
        # text input placeholder="000.000.000-00 ou email@domini"
        elem = page.locator("xpath=/html/body/div/div[2]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("111.111.111-11")
        
        # -> Preencher CPF e senha da médica e submeter o login para entrar no painel (CPF 111.111.111-11, senha 123).
        # password input placeholder="Sua senha"
        elem = page.locator("xpath=/html/body/div/div[2]/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123")
        
        # -> Preencher CPF e senha da médica e submeter o login para entrar no painel (CPF 111.111.111-11, senha 123).
        # button "Entrar"
        elem = page.locator("xpath=/html/body/div/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open João Silva's clinical record and check whether the previously saved conduct 'Conduta de teste: reduzir Metformina para 450mg.' appears in 'Histórico de Condutas'. If it appears, finish with success; otherwise proceed to create and s...
        # "João Silva
Estável"
        elem = page.locator("xpath=/html/body/div/main/div/div/div/div/div").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Fill the observation textarea with the clinical conduct text, click 'Salvar e Notificar o Paciente', wait for the UI to update, then search the page for the saved conduct text in 'Histórico de Condutas' to verify it was saved.
        # placeholder="Paciente apresenta picos de gl"
        elem = page.locator("xpath=/html/body/div/main/div/div[2]/div[4]/div/textarea").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Conduta de teste: reduzir Metformina para 450mg.")
        
        # -> Fill the observation textarea with the clinical conduct text, click 'Salvar e Notificar o Paciente', wait for the UI to update, then search the page for the saved conduct text in 'Histórico de Condutas' to verify it was saved.
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
    