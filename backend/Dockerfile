FROM php:8.3-cli AS base
WORKDIR /var/www/html
RUN apt-get update \
    && apt-get install -y --no-install-recommends git unzip libcurl4-openssl-dev libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install bcmath curl dom mbstring pdo_mysql xml xmlwriter zip \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

FROM base AS vendor
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts

FROM base AS vendor-production
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

FROM base AS dev
COPY --from=vendor /var/www/html/vendor /var/www/html/vendor
COPY . /var/www/html
COPY docker/entrypoint.sh /usr/local/bin/backend-entrypoint
RUN chmod +x /usr/local/bin/backend-entrypoint \
    && composer dump-autoload --optimize \
    && php artisan package:discover --ansi
EXPOSE 8000
ENTRYPOINT ["backend-entrypoint"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

FROM php:8.3-apache AS production
WORKDIR /var/www/html
RUN apt-get update \
    && apt-get install -y --no-install-recommends libcurl4-openssl-dev libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install bcmath curl dom mbstring pdo_mysql xml xmlwriter zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*
COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf
COPY docker/entrypoint.sh /usr/local/bin/backend-entrypoint
COPY --from=vendor-production /var/www/html/vendor /var/www/html/vendor
COPY . /var/www/html
RUN chmod +x /usr/local/bin/backend-entrypoint \
    && composer dump-autoload --optimize --no-dev \
    && php artisan package:discover --ansi \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
EXPOSE 80
ENTRYPOINT ["backend-entrypoint"]
CMD ["apache2-foreground"]
