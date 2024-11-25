import { OpenAPIHono } from '@hono/zod-openapi';
import defaultHook from 'stoker/openapi/default-hook';

const app = new OpenAPIHono<{ Bindings: Env }>({ defaultHook });

export default app;
