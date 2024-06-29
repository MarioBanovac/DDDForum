DOCKER_COMPOSE = docker-compose -f ../docker-compose.yml

run: ## Run container
	$(DOCKER_COMPOSE) up -d

stop: ## Stop container
	$(DOCKER_COMPOSE) stop

clean: ## reinstall dependencies
	rm -rf ./node_modules
	yarn install
