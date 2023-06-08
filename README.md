# Gerenciado de pessoas

## Descrição

Este projeto é uma aplicação fullstack para gerenciamento de pessoas.

Na parte front end foi utilizado o ReactJs. No  backend foi utilizado fastAPI, Sqlalchemy e pytest.

## Como executar

A execução do projeto é dividida em duas partes, a primeira é o backend e segunda é o frontend, respectivamente nesta ordem, após fazer o clone do projeto  e descompacta-lo você teré uma hierarquia de pastas semelhante a esta:

```bash
.
├── README.md
├── backend
│   ├── README.md
│   ├── app
│   ├── dev.db
│   ├── requirements.txt
│   └── tests
└── frontend
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src
    └── vite.config.js
```

### Backend

```bash
# Entre na pasta backend
cd backend

# Cria o ambiente virtual
python -m venv venv

# ativa o ambiente virtual no linux ou Mac
  - LINUX
source venv/bin/activate 
  - WINDOWS
venv/Scripts/activate.bat(Windows CMD) venv/Scripts/activate.ps1 (Windows Powershell)

# instala as dependencias do projeto
pip install -r requirements.txt

# Executa o projeto
uvicorn app.main:app --reload

# Testando as rotas
localhost:8000/docs
```

### Frontend

```bash
# Se você continua na pasta backend volte uma pasta com o comando
cd ..

# Acesse a pasta frontend
cd frontend
# Instale as bibliotecas necessárias
npm install
# Rode o projet
npm run dev
# Acesse a o endereço para acessar a aplicação
 http://localhost:5173/

```

## Testes - backend

```
pyteste test/
```

## Proximos passos

### Backend

* Integrar com o MYSQL
* Adicionar code coverage para controle de cobertura de testes
* Adicionar o alambic para versionamento do banco de dados
* Adiconar docker para facilitar e rodar a aplicação e os testes

Frontend

* Organizar os componentes
* Adicionar validações nos campos e mostras essas validações visualmente
* Refatorar removendo funções duplicadas
* Adicionar caixas de alerta quando uma ação de alteração/ cancelamento for efetuada
* Realizar teste de interface
* Realizar testes End to End
