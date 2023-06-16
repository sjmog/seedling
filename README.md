# Seedling

A Rails/React/Tailwind/Devise starter application, optimised for deployment to Render.

### Getting started

- Clone the repository.
- Update the application details in config/application.rb, config/database.yml, config/cable.yml, package.json, and render.yaml.

### What exists?

- Some basic React/Tailwind components to build with. Extend with TailwindUI or anything else you want.
- A `render.yaml` to make deployment to Render easy.
- A generic ActionCable setup with a `Subscriber` component that "just works" with websockets. (also a redis, sidekiq etc)

### Deployment

Ready for deployment to Render. To avoid asset compilation problems, run `bin/predeploy` before deploying.
