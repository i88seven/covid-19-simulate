## About This

Simulate for COVID-19 pandemic

## Requirement
* nodejs10.16.2
* yarn

### Setup
```
$ cp .env.example .env
```

```
$ ./setup.sh

※for production. specify production argument
e.g.
$ ./setup.sh production
```

### Start Server
```
$ yarn dev
```

* local application server: http://localhost:3000

You should start server localhost:8000.

### Start Storybook
Executing this command, then the browser wake up with http://localhost:6006:

```
$ yarn storybook
```

## Commands
### Type checks
Run type check with ESLint:

```
$ yarn lint
```

Run type check and fix format with ESLint:

```
$ yarn format
```

### Test
Run tests with jest:

```
$ yarn test
```
