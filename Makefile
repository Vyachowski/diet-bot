install:
	npm ci
bot:
	bin/bot.js
publish:
	npm publish --dry-run
test:
	npm run test
dev:
    npm run dev
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
test-coverage:
	npm test -- --coverage --coverageProvider=v8
