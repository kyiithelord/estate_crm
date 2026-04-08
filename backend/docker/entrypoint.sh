#!/bin/sh
set -eu

cd /var/www/html

set_env_value() {
  key="$1"
  raw_value="$2"

  if [ ! -f .env ]; then
    cp .env.example .env
  fi

  case "$raw_value" in
    *[[:space:]]*|'')
      value="\"$(printf '%s' "$raw_value" | sed 's/[\"\\]/\\&/g')\""
      ;;
    *)
      value="$raw_value"
      ;;
  esac

  escaped_value=$(printf '%s' "$value" | sed 's/[\/&]/\\&/g')

  if grep -q "^${key}=" .env; then
    sed -i "s/^${key}=.*/${key}=${escaped_value}/" .env
  else
    printf '\n%s=%s\n' "$key" "$value" >> .env
  fi
}

mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache

if [ ! -f vendor/autoload.php ]; then
  composer install --no-interaction --prefer-dist --optimize-autoloader
fi

if [ -z "${APP_KEY:-}" ]; then
  export APP_KEY="base64:$(php -r 'echo base64_encode(random_bytes(32));')"
  echo "Generated an ephemeral APP_KEY for this container session."
fi

if [ "${SYNC_DOCKER_ENV:-true}" = "true" ]; then
  set_env_value "APP_NAME" "${APP_NAME:-Laravel}"
  set_env_value "APP_ENV" "${APP_ENV:-local}"
  set_env_value "APP_DEBUG" "${APP_DEBUG:-true}"
  set_env_value "APP_URL" "${APP_URL:-http://localhost:8000}"
  set_env_value "APP_KEY" "${APP_KEY}"
  set_env_value "DB_CONNECTION" "${DB_CONNECTION:-mysql}"
  set_env_value "DB_HOST" "${DB_HOST:-db}"
  set_env_value "DB_PORT" "${DB_PORT:-3306}"
  set_env_value "DB_DATABASE" "${DB_DATABASE:-estate_crm}"
  set_env_value "DB_USERNAME" "${DB_USERNAME:-estate_user}"
  set_env_value "DB_PASSWORD" "${DB_PASSWORD:-estate_password}"
  set_env_value "CACHE_DRIVER" "${CACHE_DRIVER:-file}"
  set_env_value "SESSION_DRIVER" "${SESSION_DRIVER:-file}"
  set_env_value "QUEUE_CONNECTION" "${QUEUE_CONNECTION:-sync}"
fi

if [ "${DB_CONNECTION:-mysql}" = "mysql" ]; then
  echo "Waiting for MySQL at ${DB_HOST:-db}:${DB_PORT:-3306}..."
  until php -r '
    $dsn = sprintf(
      "mysql:host=%s;port=%s;dbname=%s",
      getenv("DB_HOST") ?: "db",
      getenv("DB_PORT") ?: "3306",
      getenv("DB_DATABASE") ?: "estate_crm"
    );
    try {
      new PDO($dsn, getenv("DB_USERNAME") ?: "root", getenv("DB_PASSWORD") ?: "");
    } catch (Throwable $e) {
      fwrite(STDERR, $e->getMessage() . PHP_EOL);
      exit(1);
    }
  '; do
    sleep 2
  done
fi

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  php artisan migrate --force
fi

if [ "${RUN_SEEDERS:-true}" = "true" ]; then
  php artisan db:seed --force
fi

php artisan optimize:clear >/dev/null 2>&1 || true

exec "$@"
