# Deno GraphQL

GraphQL HTTP middlewares for Deno server frameworks.

## Setup with oak

```js
import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import {
  gql,
  graphqlHttp,
  makeExecutableSchema,
} from "https://deno.land/x/deno_graphql/oak.ts";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const context = (context: Context) => ({
  request: context.request,
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = new Application();
const router = new Router();

router.post("/graphql", graphqlHttp({ schema, context }));

app.use(router.routes());

await app.listen({ port: 4000 });
```

## Setup with abc

```js
import { Application, Context } from "https://deno.land/x/abc/mod.ts";
import {
  gql,
  graphqlHttp,
  makeExecutableSchema,
} from "https://deno.land/x/deno_graphql/abc.ts";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const context = (context: Context) => ({
  request: context.request,
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = new Application();

app.post("/graphql", graphqlHttp({ schema, context }));

app.start({ port: 4000 });
```

## Setup with attain

```js
import { App, Request } from "https://deno.land/x/attain/mod.ts";
import {
  gql,
  graphqlHttp,
  makeExecutableSchema,
} from "https://deno.land/x/deno_graphql/attain.ts";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const context = (request: Request) => ({
  request: request,
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = new App();

app.post("/graphql", graphqlHttp({ schema, context }));

app.listen({ port: 4000 });
```
