NPM_BIN = "./node_modules/.bin"

.PHONY: build
build:
	@$(NPM_BIN)/tsc

.PHONY: watch
watch:
	@$(NPM_BIN)/tsc --watch


.PHONY: fmt
fmt:
	@$(NPM_BIN)/prettier --write "src/*.{ts,tsx}" "src/**/*.{ts,tsx}"


.PHONY: typecheck
typecheck:
	@$(NPM_BIN)/tsc --noEmit --incremental false

.PHONY: lint
lint:
	@$(NPM_BIN)/eslint "src/*.{ts,tsx}" "src/**/*.{ts,tsx}"

.PHONY: clean
clean:
	@rm -rf build
	@rm -rf node_modules

