# BUILD REACT APP

FROM node:11 AS static-build
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy files
COPY public public/
COPY src src/
COPY .babelrc postcss.config.js webpack.config.js ./

# Build React app
RUN yarn build


# RUN FLASK SERVER

FROM python:3.6
WORKDIR /app

# Install dependencies
RUN pip install pipenv
COPY Pipfile Pipfile.lock ./
RUN pipenv install --system

# Copy static files (will be served by nginx)
COPY --from=static-build /app/dist ./dist/

# Copy Flask app
COPY icon-sets.json run.py server.py ./

# Run Flask app
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
