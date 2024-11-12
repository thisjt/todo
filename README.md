# todo

Yes, that thing.

## Diary

My first time at strictly implementing clean architecture and feature-sliced design, reflected in the project structure.

## Architecture:

- `presentation`: Hono API Framework.
- `interface`: Processes the request/response from the presentation layer.
- `infrastructure`: Database driver to be used by the application layer.
- `application`: Use cases and business logic.
- `entities`: User and Todo models. In here, we will be using prisma to define the database models.

![clean architecture](./static/clean-architecture.png)

## Feature-Sliced Design:

The folders `featured` and `shared` will be inside the `lib` folder.

- `features`: Each feature will be inside its own folder.
- `shared`: Shared components, hooks, types, utils, etc.
- `routes`: Routing.

![feature-sliced design](./static/feature-sliced-design.png)

## Things to Remember

- `hooks.server.ts` will be used to differentiate between the Hono API and the SvelteKit frontend.
- `load` functions will be used to fetch data for the SvelteKit frontend.
- `actions` will be used to handle form submissions for the SvelteKit frontend.
