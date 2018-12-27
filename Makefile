MAKEFLAGS += -j2

# Install dependencies
.PHONY: install
install:
	pipenv install --dev
	yarn install

# Set up Git hooks
.PHONY: hooks
hooks:
	git config core.hooksPath .hooks

# Start dev servers of Webpack and Flask
.PHONY: start
start: start-python start-js

# Start Flask dev server
.PHONY: start_python
start-python:
	export FLASK_ENV=development; pipenv run python run.py

# Start webpack-dev-server
.PHONY: start-js
start-js:
	yarn start

# Build React app
.PHONY: build
build:
	yarn build

# Format Python code using Black
.PHONY: format
format:
	pipenv run black server.py --line-length=100 ${BLACK_FLAGS}

# Lint Python code using flake8
.PHONY: lint
lint:
	pipenv run flake8 server.py --max-line-length=100
	yarn lint
