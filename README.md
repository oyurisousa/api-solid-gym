# App

GymPass style app

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadaatrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realiazados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de chck-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome; 
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não pode se cadastrar com um email duplicado;
- [ ] O usuário não pode fazer 2 chck-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores; 
- [ ] O academia só pode ser cadastrada por admnistradores; 

## RNFs (Requisitos não-functionais)

- [ ]  A senha do usuário precisa eatar criptografada;
- [ ]  Os dados da aplicação precisam estar persistidos em um banco PostgresSQL; 
- [ ]  Todas as listas de dados precisam estar paginadas com 20 itens por página;  
- [ ]  O usuário deve ser identificado por um JWT (JSON Web Token);