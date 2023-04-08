# Sistema Bancário

Projeto com o objetivo de exercitar alguns conceitos como:
- conceito de API e entidades de APIs;
- uso do Express;
- sintaxes básicas dos endpoints;
- ordenação de rotas para evitar erros;
- uso dos principais métodos HTTP de endpoints (GET, POST e PUT);
- recebendo dados da request via `req.body`, `req.params` e `req.query`;
- validação de dados no fluxo dos endpoints;
- uso dos principais status codes HTTP;

## Estrutura de dados:
 *** Nome
 *** CPF (Não pode repetir)
 *** Data de Nascimento (Tem que ser maior que 18)
 *** Saldo (Começa zerado)   
 *** Extrato (Array de Transações):
    - Valor;
    - Data;
    - Descrição; 

### Funcionalidades

- **Criar Conta**

  Passar: 'Nome', 'CPF', 'Data de Nascimento'.
    
- **Pegar Saldo**
    
    O usuário deve conseguir verificar o saldo da sua conta, passando o seu CPF. 
    
- **Adicionar saldo**
    
    Passar: 'Nome', 'CPF e 'Valor desejado'
    



