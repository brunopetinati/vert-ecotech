#!/bin/bash



# Ativar o ambiente Conda
source /opt/miniconda3/bin/activate vertapi39

# Registrar a ativa    o do ambiente
echo "$(date) - Ambiente Conda ativado: $(conda info --envs)" >> /home/ubuntu/start-vertapi39.log

# Navegar para a pasta do projeto Django
cd /srv/ftp/vert-api/

# Inicializar o Django
python /srv/ftp/vert-api/manage.py runserver 0.0.0.0:8000 &>> /home/ubuntu/start-vertapi39.log
