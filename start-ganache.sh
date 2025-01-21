#!/bin/bash

# Ativar o ambiente Conda
source /opt/miniconda3/bin/activate crypto_env

# Registrar a ativação do ambiente
echo "$(date) - Ambiente Conda ativado: $(conda info --envs)" >> /srv/ftp/vert-api/start-ganache.log

# Definir um mnemonic fixo para recuperar as contas
MNEMONIC="candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

# Executar ganache-cli com o mnemonic
ganache-cli --db /srv/ftp/vert-api/ganache-db --port 7545 --host 0.0.0.0 --accounts 3 --defaultBalanceEther 1000 --mnemonic "$MNEMONIC" &>> /srv/ftp/vert-api/start-ganache.log
