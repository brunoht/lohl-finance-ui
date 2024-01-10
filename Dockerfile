# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Exponha a porta 8080 para o servidor de desenvolvimento do Vue.js (se necessário)
EXPOSE 80

# Mude as permissões do diretório de trabalho
RUN chown -R $USER:$USER /usr/src/app

# Comando padrão ao iniciar o contêiner
CMD ["yarn", "dev"]