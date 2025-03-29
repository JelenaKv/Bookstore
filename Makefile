DOCKER = docker
DOCKER_COMPOSE = docker compose -f docker/docker-compose.yml
PROJECT_NAME = CYPRESS TEST
help: ##Show this help
	@echo
	@echo "Choose a command to run in "$(PROJECT_NAME)":"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build: ##Build docker image
	$(DOCKER_COMPOSE) build

start: ##Start container
	$(DOCKER_COMPOSE) up -d

restart: stop start ##Restart container
.PHONY: restart
