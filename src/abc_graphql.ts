// Copyright 2020 the deno_graphql authors. All rights reserved. MIT license.

import { Context, HandlerFunc } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { GraphQLOptions, GraphQLParams, runHttpQuery } from "./_graphql.ts";

/**
 * Returns an `abc` GraphQL middleware.
 * Design principles: only POST request with JSON body. Simple, fast and secure.
 *
 *     app.post("/graphql", graphqlHttp({ schema }));
 */
export function graphqlHttp(options: GraphQLOptions): HandlerFunc {
  if (!options) throw new Error("GraphQL Server requires options.");

  return async (context: Context) => {
    const params: GraphQLParams = await context.body<GraphQLParams>();

    return await runHttpQuery(params, options, context);
  };
}
