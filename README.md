# Seedling

A Rails/React/Tailwind starter application.

### Getting started

- Clone the repository.
- Update the application details in config/application.rb, config/database.yml, config/cable.yml, and package.json.

### What exists?

- Some basic React/Tailwind components to build with. Extend with TailwindUI or anything else you want.
- Some tooling to make deployment to Heroku smoother (e.g. bin/release).
- A generic ActionCable setup with a `Subscriber` component that "just works" with websockets.

### Deployment

Ready for deployment to Heroku. To avoid asset compilation problems, run `bin/predeploy` before deploying.
