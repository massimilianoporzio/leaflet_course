# Justfile

# Avvia tutto (Backend + Frontend)
dev: db
    npx concurrently \
      --names "DJANGO,VITE" \
      --prefix-colors "green,magenta" \
      --kill-others \
      "just run-django" \
      "just run-vite"

# Ferma e pulisce tutto
kill:
    docker compose stop

# Avvia il database (Idempotente: se è già su, non fa nulla)
db:
    docker compose up -d

# Avvia Django server
run-django:
    uv run python manage.py runserver

# Avvia Vite in watch mode
run-vite:
    cd frontend && pnpm dev

# Applica migrazioni
migrate: db
    uv run python manage.py migrate

# Crea superuser
superuser: db
    uv run python manage.py createsuperuser

# Reset totale (Utile in fase di sviluppo iniziale)
reset-db:
    docker compose down -v
    docker compose up -d
    just migrate