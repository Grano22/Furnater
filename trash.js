"test": "set NODE_ENV=test&& nyc --reporter=html --reporter=text mocha 'tests/**/*.js' --exit --timeout 7000 --grep",