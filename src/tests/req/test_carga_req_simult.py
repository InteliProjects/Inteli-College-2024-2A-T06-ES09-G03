import requests
import concurrent.futures
import time
import matplotlib.pyplot as plt
import logging

logging.basicConfig(filename='request_logs.log', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

def make_request():
    start_time = time.perf_counter() 
    response = requests.get("https://www.cruzeiro.com.br/")
    end_time = time.perf_counter() 

    response_time = end_time - start_time  
    logging.info(f"Status Code: {response.status_code}, Response Time: {response_time:.4f} seconds")
    return response_time

def run_load_test(num_requests):
    response_times = []  
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(make_request) for _ in range(num_requests)]
        
        for future in concurrent.futures.as_completed(futures):
            try:
                response_time = future.result()  
                response_times.append(response_time) 
            except Exception as exc:
                logging.error(f"Requisição gerou uma exceção: {exc}")
    
    calculate_average(response_times)
    return response_times

def plot_response_times(response_times):
    plt.figure(figsize=(10, 6))
    plt.plot(response_times, marker='o', linestyle='-', color='b')
    plt.title('Response Times of Requests')
    plt.xlabel('Request Number')
    plt.ylabel('Response Time (seconds)')
    plt.grid(True)
    plt.show()

def calculate_average(response_times):
    if len(response_times) > 0:
        average_time = sum(response_times) / len(response_times)
        logging.info(f"\nTempo médio das requisições: {average_time:.4f} segundos")
        print(f"\nTempo médio das requisições: {average_time:.4f} segundos")
    else:
        logging.warning("Nenhum tempo de resposta registrado.")
        print("Nenhum tempo de resposta registrado.")

num_requests = 50
response_times = run_load_test(num_requests)

plot_response_times(response_times)
