# Blocos wordpress da Universidade Federal de Rondonópolis

Blocos baseados no Design System do Governo Federal 2.0, 2021.
Este projeto é um pacote de plugins wordpress destinos a serem usados em conjunto com este [tema](https://github.com/tiagogoto/WP-IDG-UFR), e tem ele como dependência.

## Estrutura de pastas

### /blocks
Cada pasta dentro de blocks é um plugin wordpress que adiciona um bloco. Tem seu próprio manifesto npm.

### /dependencies
Um projeto que repune as dependências de todos os plugins de blocos. Rquerido a instalação para o uso de qualquer um dos blocos.

### /components
Projeto que abstrai os componentes de formulário dos blocos. Todos os blocos usam pelo menos um desses componentes, que são importados diretamente por eles em es6 sintax e não são instalados como plugins.

### /block-example
Template para criação de um novo bloco, com a base comum para todos os blocos.

## Preparo para produção
Empacote todos os plugins necessários com o script "pack-all.sh".
