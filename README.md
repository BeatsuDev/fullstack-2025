# Example full-stack project

Here is a short introduction in how to use various tools within this project. You should quickly skim through
the documentation of each tool to get a better understanding of them. This is just an overview to give you an
idea of tools in the whole process.

### Testing frontend components with vitest

> Popular alternatives:
>
> -   Jest
> -   Mocha
> -   Bun (builtin)

```
cd frontend
npm run test:unit
```

Used to run _isolated_ tests for specific components. Components that depend on other components or logic
should stub or mock those external dependencies. Unit / component tests should only test one specific thing
and should only fail if that specific thing fails - not if something irrelevant like a dependency fails.
This makes it so that the tests tell you immediately and _exactly_ what is not working.

### Full end-to-end tests with cypress

> Popular alternatives:
>
> -   Playwright
> -   Nightwatch
> -   Selenium

```
cd frontend
npm run test:e2e
```

End to end tests interact with the webpage as if a user was using it through a browser. In bigger systems 
you usually have very few tests that are run with a backend running, and then more tests which intercept
requests to the backend so you don't need to run the backend. Intercepting requests make the tests much faster.
Since they remove the external dependency of running the backend, they also make sure that errors in the
frontend are detected even if the backend doesn't work.

### API documentation with OpenAPI (swagger)

The OpenAPI specification is commonly used in the industry. It's a way to describe endpoints of a REST APIs.
API docs in this format can be used in tools such as a client generator, a backend generator, ChatGPT, Prism
and probably many more tools.

The simplest way to view the API description [`/docs/openapi.yaml`](docs/openapi.yaml) is to copy the code
into the online OpenAPI editor https://editor-next.swagger.io/.

### Backend mocking with prism

> Popular alternatives:
>
> -   json-server
> -   Mock Service Worker (MSW)

```
cd frontend
npx prism mock ../docs/openapi.yaml --port 3000
```

### Backend probing with Postman

Install Postman via: https://www.postman.com/

Use it to construct requests and send them to a server. Useful for testing how the server responds to different
data and requests without having to code up small test scripts.
