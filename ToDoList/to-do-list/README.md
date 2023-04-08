# To Do List 

O objetivo do projeto é exercitar os conceitos de banco de dados SQL: Criar, ler e inserir informações em tabelas com relações 1:1, 1:N e N:M, Noção básica de Foreign key (chave estrangeira), fazer integração do banco de dados com o servidor através do Knex, Criar uma API REST com o Express com a sintaxe básica dos endpoints;

### Estrutura de Dados

* Usuários:
    * Name;
    * nickname;
    * email;
    * id;
 
* Tarefas:
    * title;
    * description;
    * deadline;
    * status: to do, doing, done;
    * author;
    * responsible;
    * id;

### Criação de Tabelas - MySql

    CREATE TABLE to_do_list_users (
        id VARCHAR(70) PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        nickname VARCHAR(20) NOT NULL,
        email VARCHAR(70) NOT NULL
    );
    
    CREATE TABLE  to_do_list_tasks (
        id VARCHAR(70) PRIMARY KEY,
        title VARCHAR(70) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        deadline DATE,
        status ENUM("TO_DO", "DOING", "DONE") DEFAULT "TO_DO",
        author_id VARCHAR(70),
        FOREIGN KEY (author_id) REFERENCES to_do_list_users(id)
    );

    CREATE TABLE to_do_list_responsible (
        task_id VARCHAR(70),
        responsible_id VARCHAR(70),
        PRIMARY KEY (task_id, responsible_id),
        FOREIGN KEY (task_id) REFERENCES to_do_list_tasks(id),
        FOREIGN KEY (responsible_id) REFERENCES to_do_list_users(id),
    );

### Endpoints    

- **1. Criar usuário**
    
    **Método:** POST
    **Path:** `/user`
    
    **Body:**
    
    ```json
    {
    	"name": "Astro Dev",
    	"nickname": "astrodev",
    	"email": "astro@dev.com"
    }
    ```
    
    **Observações**:
    
    - O código valida se os três campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retorna um erro caso não estejam válidos;
    - O código gera o id do usuário;

- **2. Pegar usuário pelo id**
    
    **Método:** GET
    **Path:** `/user/:id`
    
    **Path Param**: é o id do usuário
    
    **Body de Resposta:**
    
    ```json
    {
    	"id": "001",
    	"nickname": "astrodev"
    }
    ```
    
    **Observações**:
    
    - O endpoint retorna um erro se não encontra o usuário;

- **3. Editar usuário**
    
    **Método:** PUT
    **Path:** `/user/edit/:id`
    
    **Path Param**: é o id do usuário
    
    **Body:**
    
    ```json
    {
    	"name": "Astro Dev",
    	"nickname": "astrodev"
    }
    ```
    
    **Observações**:
    
    - O código só altera o que for enviado;
    - Se algum valor enviado for vazio, retorna um erro;

- **4. Criar tarefa**
    
    **Método:** POST
    **Path:** `/task`
    
    **Body:**
    
    ```json
    {
    	"title": "Criar banco dos alunos",
    	"description": "Devemos criar o banco dos alunos para o módulo do backend",
    	"limitDate": "04/05/2020",
    	"creatorUserId": "001"
    }
    ```
    
    **Observações**:
    
    - O código valida se todos os campos não estão vazios;
    - O código gera o id da tarefa;
    - A data é recebida no formato mostrado acima: `DD/MM/YYYY` e o código faz a conversão necessária para salvar no banco;

- **5. Pegar tarefa pelo id**
    
    **Método:** GET
    **Path:** `/task/:id`
    
    **Path Param**: é o id da tarefa
    
    **Body de Resposta:**
    
    ```json
    {
    	"taskId": "001",
    	"title": "Criar banco dos alunos",
    	"description": "Devemos criar o banco dos alunos para o módulo do backend",
    	"limitDate": "04/05/2020",
    	"status": "to_do",
    	"creatorUserId": "001",
    	"creatorUserNickname": "astrodev"
    }
    ```
    
    **Observações**:
    
    - O endpoint retorna um erro se não encontrar a task;
    - O endpoint retorna informações tanto da tarefa como do usuário criador;
    - O código converte a data recebida do banco para o formato mostrado acima (`DD/MM/YYYY`);