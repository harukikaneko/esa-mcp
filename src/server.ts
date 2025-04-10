import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { version } from "../package.json";
import { getRequiredEnv } from "./env";
import { orderSchema, sortSchema } from "./schema";
import { ApiClient } from "./api";
import { stringify } from "yaml";
import { formatTool } from "./formatToolResponse";

export const createServer = () => {
  const server = new McpServer({
    name: "esa-server",
    version: version,
  });

  const client = new ApiClient(getRequiredEnv("ESA_API_KEY"));

  server.tool(
    "search_esa_posts",
    "Search posts in esa.io with pagination support. Use advanced query syntax for precise searching - see get_search_query_document for complete query documentation and examples.",
    {
      teamName: z.string().default(getRequiredEnv("DEFAULT_ESA_TEAM")),
      query: z.string(),
      order: orderSchema,
      sort: sortSchema,
      page: z.number().min(1).default(1),
      perPage: z.number().min(1).max(100).default(50),
    },
    async (input) =>
      await formatTool(async () => {
        const posts = await client.searchPosts(
          input.teamName,
          input.query,
          input.order,
          input.sort,
          input.page,
          input.perPage
        );

        return {
          content: [
            {
              type: "text",
              text: stringify({
                posts: posts,
                nextPage: input.page + 1,
              }),
            },
          ],
        };
      })
  );

  server.tool(
    "read_esa_post",
    "Read a post in esa.io.",
    {
      teamName: z.string().default(getRequiredEnv("DEFAULT_ESA_TEAM")),
      postNumber: z.number(),
    },
    async (input) =>
      await formatTool(async () => {
        const [response] = await client.readPosts(input.teamName, [
          input.postNumber,
        ]);

        if (response === undefined) {
          throw new Error("post not found");
        }

        return response;
      })
  );

  server.tool(
    "read_esa_multiple_posts",
    "Read multiple posts in esa.io.",
    {
      teamName: z.string().default(getRequiredEnv("DEFAULT_ESA_TEAM")),
      postNumbers: z.array(z.number()),
    },
    async (input) =>
      await formatTool(
        async () => await client.readPosts(input.teamName, input.postNumbers)
      )
  );

  server.tool(
    "create_esa_post",
    "Create a new post in esa.io. Required parameters: name. Optional parameters: body_md, tags, category, wip (default: true), message.",
    {
      teamName: z.string().default(getRequiredEnv("DEFAULT_ESA_TEAM")),
      name: z.string(),
      body_md: z.string().optional(),
      tags: z.array(z.string()).optional(),
      category: z.string().optional(),
      wip: z.boolean().default(true),
      message: z.string().optional(),
    },
    async (input) =>
      await formatTool(async () => {
        const { teamName: createTeamName, ...postData } = input;
        return client.createPost(createTeamName, postData).then((data) => ({
          success: true,
          number: data.number,
          full_name: data.full_name,
          url: data.url,
          wip: data.wip,
          created_at: data.created_at,
          message: data.message,
          kind: data.kind,
          tags: data.tags,
          category: data.category,
          revision_number: data.revision_number,
          created_by: data.created_by,
        }));
      })
  );

  server.tool(
    "update_esa_post",
    "Update an existing post in esa.io. Required parameters: postNumber. Optional parameters: name, body_md, tags, category, wip, message.",
    {
      teamName: z.string().default(getRequiredEnv("DEFAULT_ESA_TEAM")),
      postNumber: z.number(),
      name: z.string().optional(),
      body_md: z.string().optional(),
      tags: z.array(z.string()).optional(),
      category: z.string().optional(),
      wip: z.boolean().optional(),
      message: z.string().optional(),
    },
    async (input) =>
      await formatTool(async () => {
        const { teamName, postNumber, ...updateData } = input;
        return client
          .updatePost(teamName, postNumber, updateData)
          .then((data) => ({
            success: true,
            number: data.number,
            full_name: data.full_name,
            url: data.url,
            wip: data.wip,
            created_at: data.created_at,
            updated_at: data.updated_at,
            message: data.message,
            kind: data.kind,
            tags: data.tags,
            category: data.category,
            revision_number: data.revision_number,
            created_by: data.created_by,
            updated_by: data.updated_by,
          }));
      })
  );

  server.tool(
    "delete_esa_post",
    "Delete a post in esa.io. Required parameters: postNumber.",
    {
      teamName: z.string().default(getRequiredEnv("DEFAULT_ESA_TEAM")),
      postNumber: z.number(),
    },
    async (input) =>
      await formatTool(async () =>
        client.deletePost(input.teamName, input.postNumber)
      )
  );

  return {
    server,
  };
};
