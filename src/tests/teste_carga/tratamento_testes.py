import pandas as pd
from sqlalchemy import create_engine
import datetime
import datetime

csv_resultado = pd.read_csv("aggregate.csv")

passou = False

csv_resultado = csv_resultado.rename(columns={"% de Erro": "erro"})

csv_resultado["erro"] = csv_resultado["erro"].str.replace('%', '').str.replace(',', '.').astype(float) / 100

if csv_resultado["erro"].all() < 0.1 and csv_resultado["Média"].all() < 3000:
   passou = True

today = datetime.datetime.now()

columns_to_api = ["name","given","when","then","groupId","passed","executionTimeMs","escope","testType","startDate","endDate"]

df_to_api = pd.DataFrame(columns=columns_to_api)

df_to_api.loc[0] = [
    "Teste carga site 3000 usuarios sim.",  # name
    "Tendo 3000 usuários ",                # given
    "O Tempo de resposta da página não deve ultrapassar 5 segundos e o site não pode cair",  # then
    "Acessar o site principal",            # when
    2,                                     # groupId
    passou,                                # passed
    100000,                                # executionTimeMs
    "site",                                # escope
    "Carga",                               # testType
    today,                                 # startDate
    today                                  # endDate
]

BD_USER="postgres"
BD_PASS="grupo3jacare"
BD_DATABASE="grupo3"
BD_HOST="database-1.cmuqh25kpkqe.us-east-1.rds.amazonaws.com"
BD_PORT="5432"

db_url = f"postgresql://{BD_USER}:{BD_PASS}@{BD_HOST}:{BD_PORT}/{BD_DATABASE}"
engine = create_engine(db_url)

try:
    df_to_api.to_sql('testes', engine, if_exists='append', index=False)
    print("Dados inseridos com sucesso!")
except Exception as e:
    print(f"Erro ao inserir os dados: {e}")

