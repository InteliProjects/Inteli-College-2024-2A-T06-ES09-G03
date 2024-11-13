from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

def test_login():
    # Configura o serviço para o driver do Chrome
    service = Service(executable_path="./chromedriver.exe")
    driver = webdriver.Chrome(service=service)

    # Abre a página de login do site
    driver.get("https://socio5estrelas.com.br/?utm_source=site_oficial&utm_campaign=InfluencerAqui&utm_content=IconTopoSite")

    # Aguarda 2 segundos para garantir que a página seja carregada completamente
    time.sleep(2)

    # Localiza o botão de login e clica nele
    login_button = driver.find_element(By.LINK_TEXT, "Login")
    login_button.click()

    # Aguarda o modal aparecer
    time.sleep(2)

    # Localiza o campo de e-mail e insere o e-mail
    email_field = driver.find_element(By.ID, "mat-input-1")
    email_field.send_keys("email_teste@exemplo.com")

    # Localiza o campo de senha e insere a senha
    password_field = driver.find_element(By.ID, "mat-input-0")
    password_field.send_keys("senha_teste")

    # Localiza e clica no botão de submit para fazer login
    submit_button = driver.find_element(By.CSS_SELECTOR, "button.feng-btn.feng-btn--primary[type='submit']")
    submit_button.click()

    # Aguarda 2 segundos antes de fechar o navegador (ou continuar outros testes)
    time.sleep(5)

    # Fecha o navegador
    driver.quit()
