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
        
        # -> Abrir o dropdown 'Entrar como' e selecionar 'Profissional de Saúde' (médico).
        # "Paciente
Cuidador
Profissional de Saúde"
        elem = page.locator("xpath=/html/body/div/div[2]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Preencher CPF/email e senha com as credenciais da Dra. Ana e submeter o formulário clicando em 'Entrar' (index 17).
        # text input placeholder="000.000.000-00 ou email@domini"
        elem = page.locator("xpath=/html/body/div/div[2]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("111.111.111-11")
        
        # -> Preencher CPF/email e senha com as credenciais da Dra. Ana e submeter o formulário clicando em 'Entrar' (index 17).
        # password input placeholder="Sua senha"
        elem = page.locator("xpath=/html/body/div/div[2]/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123")
        
        # -> Preencher CPF/email e senha com as credenciais da Dra. Ana e submeter o formulário clicando em 'Entrar' (index 17).
        # button "Entrar"
        elem = page.locator("xpath=/html/body/div/div[2]/button").nth(0)
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
    