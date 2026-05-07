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
        
        # -> Fill the CPF/E-mail field with the patient username, fill the password, and submit the login form.
        # text input placeholder="000.000.000-00 ou email@domini"
        elem = page.locator("xpath=/html/body/div/div[2]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123.456.789-00")
        
        # -> Fill the CPF/E-mail field with the patient username, fill the password, and submit the login form.
        # password input placeholder="Sua senha"
        elem = page.locator("xpath=/html/body/div/div[2]/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123")
        
        # -> Fill the CPF/E-mail field with the patient username, fill the password, and submit the login form.
        # button "Entrar"
        elem = page.locator("xpath=/html/body/div/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open the 'Remédios' page by clicking the 'Remédios' navigation link (element index 171). Then inspect the medications list and the add button to start the Add step.
        # link "Remédios"
        elem = page.locator("xpath=/html/body/nav/a[3]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open the 'Adicionar Novo Medicamento' form by clicking the 'Novo Medicamento' button so the add form fields become visible.
        # button "Novo Medicamento"
        elem = page.locator("xpath=/html/body/div/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Fill the 'Adicionar Medicamento' form with valid data and save the new medication.
        # text input placeholder="Ex: Dipirona"
        elem = page.locator("xpath=/html/body/div/div/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Teste CRUD")
        
        # -> Fill the 'Adicionar Medicamento' form with valid data and save the new medication.
        # text input placeholder="10mg"
        elem = page.locator("xpath=/html/body/div/div/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("25mg")
        
        # -> Fill the 'Adicionar Medicamento' form with valid data and save the new medication.
        # time input
        elem = page.locator("xpath=/html/body/div/div/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("09:00")
        
        # -> Fill the 'Adicionar Medicamento' form with valid data and save the new medication.
        # text input placeholder="A cada 8h"
        elem = page.locator("xpath=/html/body/div/div/div[3]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("A cada 8h")
        
        # -> Fill the 'Adicionar Medicamento' form with valid data and save the new medication.
        # button "Salvar"
        elem = page.locator("xpath=/html/body/div/div/div[4]/button[2]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the edit button for the newly created medication 'Teste CRUD' to open the edit form (element index 843).
        # button
        elem = page.locator("xpath=/html/body/div/div[2]/div[4]/div/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Edit the 'Teste CRUD' medication by changing Dosagem to '30mg' and saving, then delete the medication and verify that 'Teste CRUD' no longer appears in the active medications list.
        # text input placeholder="10mg"
        elem = page.locator("xpath=/html/body/div/div/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("30mg")
        
        # -> Edit the 'Teste CRUD' medication by changing Dosagem to '30mg' and saving, then delete the medication and verify that 'Teste CRUD' no longer appears in the active medications list.
        # button "Salvar"
        elem = page.locator("xpath=/html/body/div/div/div[4]/button[2]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Reload the application (navigate to /index.html) to restore the SPA and then re-open the Remédios page to confirm whether the edit saved. If the edit did not persist, re-apply the edit and proceed to delete and verify deletion.
        await page.goto("http://localhost:8080/index.html")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Select the 'Paciente' profile from the 'Entrar como' dropdown so the login inputs remain the same and proceed to re-login.
        # "Paciente
Cuidador
Profissional de Saúde"
        elem = page.locator("xpath=/html/body/div/div[2]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Fill CPF/E-mail with 123.456.789-00, fill password with 123, and submit the login form to return to the patient's dashboard.
        # text input placeholder="000.000.000-00 ou email@domini"
        elem = page.locator("xpath=/html/body/div/div[2]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123.456.789-00")
        
        # -> Fill CPF/E-mail with 123.456.789-00, fill password with 123, and submit the login form to return to the patient's dashboard.
        # password input placeholder="Sua senha"
        elem = page.locator("xpath=/html/body/div/div[2]/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("123")
        
        # -> Fill CPF/E-mail with 123.456.789-00, fill password with 123, and submit the login form to return to the patient's dashboard.
        # button "Entrar"
        elem = page.locator("xpath=/html/body/div/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open the 'Remédios' page (click the Remédios navigation link) and confirm whether 'Teste CRUD' is present in the active medications list.
        # link "Remédios"
        elem = page.locator("xpath=/html/body/nav/a[3]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open the 'Adicionar Novo Medicamento' form by clicking the 'Novo Medicamento' button so the add form fields appear.
        # button "Novo Medicamento"
        elem = page.locator("xpath=/html/body/div/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Fill the add-medication form with Nome='Teste CRUD', Dosagem='25mg', Primeira dose='09:00', Frequência='A cada 8h' and click Salvar to create the medication.
        # text input placeholder="Ex: Dipirona"
        elem = page.locator("xpath=/html/body/div/div/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Teste CRUD")
        
        # -> Fill the add-medication form with Nome='Teste CRUD', Dosagem='25mg', Primeira dose='09:00', Frequência='A cada 8h' and click Salvar to create the medication.
        # text input placeholder="10mg"
        elem = page.locator("xpath=/html/body/div/div/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("25mg")
        
        # -> Fill the add-medication form with Nome='Teste CRUD', Dosagem='25mg', Primeira dose='09:00', Frequência='A cada 8h' and click Salvar to create the medication.
        # time input
        elem = page.locator("xpath=/html/body/div/div/div[3]/div/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("09:00")
        
        # -> Fill the add-medication form with Nome='Teste CRUD', Dosagem='25mg', Primeira dose='09:00', Frequência='A cada 8h' and click Salvar to create the medication.
        # text input placeholder="A cada 8h"
        elem = page.locator("xpath=/html/body/div/div/div[3]/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("A cada 8h")
        
        # -> Fill the add-medication form with Nome='Teste CRUD', Dosagem='25mg', Primeira dose='09:00', Frequência='A cada 8h' and click Salvar to create the medication.
        # button "Salvar"
        elem = page.locator("xpath=/html/body/div/div/div[4]/button[2]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the edit button for the 'Teste CRUD' medication to open the edit form (element index 2102).
        # button
        elem = page.locator("xpath=/html/body/div/div[2]/div[4]/div/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Mudar Dosagem para '30mg' e salvar; em seguida apagar o medicamento e verificar que 'Teste CRUD' não aparece mais na lista ativa.
        # text input placeholder="10mg"
        elem = page.locator("xpath=/html/body/div/div/div[2]/input").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("30mg")
        
        # -> Mudar Dosagem para '30mg' e salvar; em seguida apagar o medicamento e verificar que 'Teste CRUD' não aparece mais na lista ativa.
        # button "Salvar"
        elem = page.locator("xpath=/html/body/div/div/div[4]/button[2]").nth(0)
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
    