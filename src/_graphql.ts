// Copyright 2020 the deno_graphql authors. All rights reserved. MIT license.

import { ExecutionResult, graphql, GraphQLArgs } from "../deps.ts";

export type GraphQLOptions = {
  schema?: any;
  context?: any;
  rootValue?: any;
};

export type GraphQLParams = {
  query: string;
  mutation: string;
  variables?: object;
  operationName?: string;
};

export type ServerContext<T> = T;

/** Returns a GraphQL response. */
export async function runHttpQuery(
  params: GraphQLParams,
  options: GraphQLOptions,
  context: ServerContext<any>,
): Promise<ExecutionResult> {
  if (!params) throw new Error("Bad Request");

  const contextValue = await options.context(context.request);
  const source = params.query || params.mutation;

  // https://graphql.org/graphql-js/graphql/#graphql
  const graphQLArgs: GraphQLArgs = {
    schema: options.schema,
    rootValue: options.rootValue,
    source: source,
    contextValue: contextValue,
    variableValues: params.variables,
    operationName: params.operationName,
  };

  return await graphql(graphQLArgs);
}
