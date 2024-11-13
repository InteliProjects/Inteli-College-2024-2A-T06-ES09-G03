import time
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

logging.basicConfig(filename='test_logs.log', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

MAX_LOAD_TIME = 5.0  
MAX_CLICK_TIME = 3.0  

driver = webdriver.Chrome()

try:
    logging.info("Iniciando o teste de carregamento da página.")
    
    start_time = time.time()
    driver.get('https://www.cruzeiro.com.br/')
    
    WebDriverWait(driver, 10).until(
        EC.invisibility_of_element((By.ID, 'core-loader-main'))  # Supondo que o carregamento é indicado pela invisibilidade do elemento
    )
    load_time = time.time() - start_time
    logging.info(f"Tempo de carregamento da página: {load_time:.2f} segundos")
    
    assert load_time <= MAX_LOAD_TIME, f"Tempo de carregamento excedeu o limite: {load_time:.2f} segundos"
    logging.info("Teste de carregamento da página passou com sucesso.")

    logging.info("Iniciando o teste de execução de clique.")
    
    start_time = time.time()
    
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//div[@class='icon-container']"))
    )
    driver.execute_script("arguments[0].click();", element)
    
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "css-752rnc"))
    )
    
    click_time = time.time() - start_time
    logging.info(f"Tempo de execução da ação de clique: {click_time:.2f} segundos")
    
    assert click_time <= MAX_CLICK_TIME, f"Tempo de execução do clique excedeu o limite: {click_time:.2f} segundos"
    logging.info("Teste de execução do clique passou com sucesso.")

except AssertionError as e:
    logging.error(f"Falha no teste: {e}")
except Exception as e:
    logging.error(f"Erro inesperado: {e}")
finally:
    driver.quit()
    logging.info("Teste finalizado e navegador fechado.")
