import type { OpenAPIHonoConfig } from '$lib/types';
import { OpenAPIHono } from '@hono/zod-openapi';

const app = new OpenAPIHono<OpenAPIHonoConfig>();

export default app;
