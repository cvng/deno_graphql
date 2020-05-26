// Copyright 2020 the deno_graphql authors. All rights reserved. MIT license.

import {
  CallBackType,
  Request,
  Response,
  Router,
} from "https://deno.land/x/attain/mod.ts";
import { GraphQLOptions, GraphQLParams, runHttpQuery } from "./_graphql.ts";

/**
 * Returns an `attain` GraphQL middleware.
 * Design principles: only POST request with JSON body. Simple, fast and secure.
 *
 *     app.post("/graphql", graphqlHttp({ schema }));
 */
export function graphqlHttp(options: GraphQLOptions): CallBackType {
  if (!options) throw new Error("GraphQL Server requires options.");

  return async (request: Request, response: Response) => {
    const params: GraphQLParams = (await request.body()).value;

    const result = await runHttpQuery(params, options, { request });

    response.status(200).send(result);
  };
}
