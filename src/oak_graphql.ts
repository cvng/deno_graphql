// Copyright 2020 the deno_graphql authors. All rights reserved. MIT license.

import { RouterContext, RouterMiddleware } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import { GraphQLOptions, GraphQLParams, runHttpQuery } from "./_graphql.ts";

/**
 * Returns an `oak` GraphQL middleware.
 * Design principles: only POST request with JSON body. Simple, fast and secure.
 *
 *     router.post("/graphql", graphqlHttp({ schema }));
 */
export function graphqlHttp(options: GraphQLOptions): RouterMiddleware {
  if (!options) throw new Error("GraphQL Server requires options.");

  return async (context: RouterContext) => {
    const params: GraphQLParams = (await context.request.body()).value;

    context.response.body = await runHttpQuery(params, options, context);
  };
}
