# todo

Yes, that thing. [https://todo.thisjt.me](https://todo.thisjt.me)

## Diary

My first time at strictly implementing clean architecture and feature-sliced design, reflected in the project structure.

- 1. For `entities`, I have 2 approaches that I can follow. First is to go with the pragmatic approach and use prisma to define the database models, and then create the `entities` based on the prisma model types. Second is to go with the pure clean architecture approach and create the `entities` first, and define the prisma schema based on that. I chose the first approach because this is a simple project and I don't want to define the entities twice, first in the prisma models and then in `entities`. I could go with drizzle and define the entities based on the drizzle schema, but that will be an activity later down the line.

## Architecture:

- `presentation`: Hono API Framework.
- `interface`: Processes the request/response from the presentation layer.
- `infrastructure`: Database driver to be used by the application layer.
- `application`: Use cases and business logic.
- `entities`: User and Todo models. In here, we will be using prisma to define the database models.

![clean architecture](./static/clean-architecture.png)
Source: [Guide on how to implement Clean Architecture in Next.js - Lazar Nikolov](https://www.youtube.com/watch?v=jJVAla0dWJo)

## Feature-Sliced Design:

The folders `featured` and `shared` will be inside the `lib` folder.

- `features`: Each feature will be inside its own folder.
- `shared`: Shared components, hooks, types, utils, etc.
- `routes`: Routing.

![feature-sliced design](./static/feature-sliced-design.png)
Source: [This Folder Structure Makes Me 100% More Productive - Web Dev Simplified](https://www.youtube.com/watch?v=xyxrB2Aa7KE)

## Things to Remember

- `hooks.server.ts` will be used to differentiate between the Hono API and the SvelteKit frontend.
- `load` functions will be used to fetch data for the SvelteKit frontend.
- `actions` will be used to handle form submissions for the SvelteKit frontend.
