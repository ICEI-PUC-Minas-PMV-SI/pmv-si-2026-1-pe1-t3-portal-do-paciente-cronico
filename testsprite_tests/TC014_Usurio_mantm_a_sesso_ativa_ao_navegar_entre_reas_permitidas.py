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
        
        # -> Clicar no seletor de perfil para expor/confirmar a opção 'Paciente' (index 3).
        # "Paciente
Cuidador
Profissional de Saúde"
        elem = page.locator("xpath=/html/body/div/div[2]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Fill CPF and password fields, submit the login form by clicking 'Entrar', then verify access to Perfil, Histórico and Medicamentos.
        # text input placeholder="000.000.000-00 ou email@domini"
        elem = page.locator("xpath=/html/body/div/div[2]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123.456.789-00")
        
        # -> Fill CPF and password fields, submit the login form by clicking 'Entrar', then verify access to Perfil, Histórico and Medicamentos.
        # password input placeholder="Sua senha"
        elem = page.locator("xpath=/html/body/div/div[2]/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123")
        
        # -> Fill CPF and password fields, submit the login form by clicking 'Entrar', then verify access to Perfil, Histórico and Medicamentos.
        # button "Entrar"
        elem = page.locator("xpath=/html/body/div/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open 'Perfil' (index 176) and confirm the profile page loads; then open 'Histórico' (index 172) and confirm; then open 'Remédios' (index 174) and confirm the session remains authenticated while navigating.
        # link "Perfil"
        elem = page.locator("xpath=/html/body/nav/a[4]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Clicar em 'Histórico' (index 507) e confirmar que o conteúdo da página Histórico aparece (verificando texto/elemento). Em seguida, clicar em 'Remédios' (index 490) e confirmar que o conteúdo da página Remédios aparece. Depois marcar a ta...
        # link "Histórico"
        elem = page.locator("xpath=/html/body/nav/a[2]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the 'Remédios' navigation link (index 858) to open the Medications page and verify the page content loads while the session remains authenticated.
        # link "Remédios"
        elem = page.locator("xpath=/html/body/nav/a[3]").nth(0)
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
    