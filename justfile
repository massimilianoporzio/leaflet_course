# Justfile

# Avvia tutto (Backend + Frontend)
dev:
    just --parallel run-django run-vite

# Avvia Django server
run-django:
    uv run python manage.py runserver

# Avvia Vite in watch mode
run-vite:
    cd frontend && pnpm dev

# Applica migrazioni
migrate:
    uv run python manage.py migrate

# Crea superuser
superuser:
    uv run python manage.py createsuperuser