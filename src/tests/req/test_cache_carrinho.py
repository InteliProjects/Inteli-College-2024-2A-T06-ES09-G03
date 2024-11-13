import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
import time

class TestLojaCruzeiro(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        self.driver = webdriver.Chrome(options=chrome_options)

    def test_input_value(self):
        driver = self.driver
        driver.get('https://loja.cruzeiro.com.br/p/camisa-cruzeiro-ii-2425-sn-torcedor-adidas-masculina-branco+azul-FB9-4318-044')
        
        time.sleep(2)

        element = driver.find_element(By.CSS_SELECTOR, 'li.size-list__item.size a.size__link')
        
        actions = ActionChains(driver)
        actions.move_to_element(element).click().perform()
        driver.execute_script("arguments[0].click();", element)

        print("Elemento clicado com sucesso!")
        text = element.text
        print(f"Texto encontrado: {text}")

        driver.execute_script("window.scrollBy(0, 200);")

        time.sleep(1)
        button = driver.find_element(By.CSS_SELECTOR, 'button.buy-button')
        driver.execute_script("arguments[0].click();", button)
        time.sleep(2)

        cookies = driver.get_cookies()
        print(cookies)

        input_element = driver.find_element(By.CSS_SELECTOR, 'input[qa-auto="cart-product-qty"]')

        value = input_element.get_attribute('value')

        self.assertEqual(value, '1', f"O valor esperado era 1 / O valor encontrado foi {value}")

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
