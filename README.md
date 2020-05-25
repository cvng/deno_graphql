# Deno GraphQL

GraphQL HTTP middlewares for Deno server frameworks.

## Setup with oak

```js
import {
  gql,
  makeExecutableSchema,
  graphqlHttp
} from "https://deno.land/x/deno_graphql/oak.ts";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = new Application();
const router = new Router();

router.post("/graphql", graphqlHttp({ schema }));

app.use(router.routes());

await app.listen({ port: 4000 });
```

## Setup with abc

```js
import {
  gql,
  makeExecutableSchema,
  graphqlHttp
} from "https://deno.land/x/deno_graphql/abc.ts";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = new Application();

app.post("/graphql", graphqlHttp({ schema }));

app.start({ port: 4000 });
```
