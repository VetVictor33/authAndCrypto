# Users, Monsters and CIA

Sistema para cadastrar usuários e seus monstros

## Rotas

### POST /

Endpoit que verifica se o sistema está no ar.

![Alt text](readme_imgs/image.png)

### POST /signup

Cadastra novo usuário por meio de um email que deve ser único [no banco de dados] e uma senha que será encriptada antes de ser registrada no banco de dados.

![Alt text](readme_imgs/image-1.png)
![Alt text](readme_imgs/image-2.png)

### POST /signin

Loga o usuário por meio do email e senha cadastrados. A sessão é validada por meio de token que expira em 8 horas.
![Alt text](readme_imgs/image-3.png)

### POST /monster

Cadastra um monstro, vinculado ao usuário, com os dados: name, skills, image e nickname, no qual apenas name e skills são obrigatórios.
![Alt text](readme_imgs/image-5.png)

Token recebido ao realizar login:
![Alt text](readme_imgs/image-6.png)


### GET /monsters/id

Recupera o monstro do usuário especificado pelo id da rota ou, quando esse não é especificado(endpoint "/monsters"), recupera todos os monstros cadastrados pelo usuário.

![Alt text](readme_imgs/image-7.png)
![Alt text](readme_imgs/image-8.png)

### PATCH /monster/id/"campo"

Modifica o monstro de id selecionado de acordo com o campo escolhido, sendo válidos apenas os campos: name, skills, image, nickname.
![Alt text](readme_imgs/image-10.png)
![Alt text](readme_imgs/image-11.png)

### DELETE /monsters/id

Apaga do banco de dados o monstro com o id especificado vinculado ao usuário.
![Alt text](readme_imgs/image-9.png)

## Principais tecnologias utilizadas

node;

express;

jwt para autenticação;

bcrypt para criptografia de senha;

pg e knex para interagir com o banco de dados.
