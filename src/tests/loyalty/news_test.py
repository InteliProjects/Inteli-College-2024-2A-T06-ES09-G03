from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
import logging
import os

log_dir = 'logs'
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, 'test_log.log')

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s',
                    handlers=[
                        logging.FileHandler(log_file),
                        logging.StreamHandler()
                    ])

def setup_driver():
    """Configura e retorna o driver do Chrome."""
    service = Service(executable_path="./chromedriver.exe")
    driver = webdriver.Chrome(service=service)
    return driver

def take_screenshot(driver, test_name):
    """Tira um screenshot e salva com o nome do teste."""
    screenshot_dir = 'screenshots'
    os.makedirs(screenshot_dir, exist_ok=True)
    screenshot_path = os.path.join(screenshot_dir, f"{test_name}.png")
    driver.save_screenshot(screenshot_path)
    logging.info(f'Screenshot salvo em: {screenshot_path}')

def test_news():
    """Teste para a página de notícias do site do Cruzeiro."""
    logging.info('Iniciando o teste de notícias.')
    driver = setup_driver()
    try:
        driver.get("https://www.cruzeiro.com.br/noticias/")
        time.sleep(2)
        notice = driver.find_element(By.CSS_SELECTOR, "div.news-list > div > div:nth-child(2)")
        notice.click()
        for _ in range(5):
            time.sleep(2)
            notice_slider_child = driver.find_element(By.CSS_SELECTOR, "div.news-slider-container")
            notice_slider_child.click()
        logging.info('Teste de notícias concluído com sucesso.')
    except Exception as e:
        logging.error(f'Erro no teste de notícias: {e}')
        take_screenshot(driver, 'test_news_fail')
    finally:
        driver.quit()

def test_journal():
    """Teste para a página de imprensa do site do Cruzeiro."""
    logging.info('Iniciando o teste de imprensa.')
    driver = setup_driver()
    try:
        driver.get("https://www.cruzeiro.com.br/imprensa")
        time.sleep(2)
        notice = driver.find_element(By.CSS_SELECTOR, "div.news-list > div > div:nth-child(2)")
        notice.click()
        for _ in range(5):
            time.sleep(2)
            notice_slider_child = driver.find_element(By.CSS_SELECTOR, "div.news-slider-container")
            notice_slider_child.click()
        logging.info('Teste de imprensa concluído com sucesso.')
    except Exception as e:
        logging.error(f'Erro no teste de imprensa: {e}')
        take_screenshot(driver, 'test_journal_fail')
    finally:
        driver.quit()

def test_journal_fail():
    """Teste para uma página de imprensa inexistente no site do Cruzeiro."""
    logging.info('Iniciando o teste de imprensa com falha.')
    driver = setup_driver()
    try:
        driver.get("https://www.cruzeiro.com.br/imprensa/teste-fail")
        time.sleep(2)
        notice = driver.find_element(By.CSS_SELECTOR, "div.news-list > div > div:nth-child(2)")
        notice.click()
        for _ in range(5):
            time.sleep(2)
            notice_slider_child = driver.find_element(By.CSS_SELECTOR, "div.news-slider-container")
            notice_slider_child.click()
        logging.info('Teste de imprensa com falha concluído com sucesso.')
    except Exception as e:
        logging.error(f'Erro no teste de imprensa com falha: {e}')
        take_screenshot(driver, 'test_journal_fail')
    finally:
        driver.quit()