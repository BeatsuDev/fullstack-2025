# Vue Calculator - frontend

Remember to install dependencies before running commands:

```
npm install
```

### Testing

Unit (/component) tests:

```
npm run test:unit
```

End-to-end tests

```
npm run test:e2e
```

### Mocking backend

```
npx prism mock ../docs/openapi.yaml --port 3000
```

### Running the frontend

Unoptimized with hot-reloading:

```
npm run dev
```

Build for production:

```
npm run build
```

Preview built version:

```
npm run preview
```
