# Верстка из проекта СС - Репродукция [https://babyural.ru/]

## Парадигма
- Именование классов по БЭМ, разметка в [pug](https://pugjs.org/), стилизация [Sass](http://sass-lang.com/). См. [как работать с CSS-препроцессорами и БЭМ](http://nicothin.github.io/idiomatic-pre-CSS/)
- Каждый БЭМ-блок в своей папке внутри `src/blocks/`. Один БЭМ-блок — один pug-файл, один scss-файл.

## Команды

```bash
yarn start  # запуск сервера разработки
yarn build  # сборка проекта
```

## Структура

```bash
build/     # Папка сборки.
dist/      # Файлы не требующие сборки.
  img/     # Изображения.
  js/      # js-файлы.
  vendor/  # Зависимости.
src/       # Исходники.
  blocks/  # Блоки.
  pages/   # Страницы проекта.
  scss/    # Служебные стилевые файлы.
```

## Блоки

Каждый блок лежит в `src/blocks/` в своей папке.

Возможное содержимое блока:

```bash
demo-block/        # Папка блока.
  demo-block.pug   # Разметка.
  demo-block.scss  # Стилевой файл этого блока (без стилей других блоков).
  README.md        # Описание для документации, подсказки.
```

## Разметка

Используется [pug](https://pugjs.org/api/getting-started.html).

## Стили

Все scss-файлы подключаем в диспетчере подключений (`src/scss/import.scss`)

Каждый блок (в `src/blocks/`) может содержать одноимённый scss-файл со стилями этого блока.

Используемый постпроцессинг:

1. [autoprefixer](https://github.com/postcss/autoprefixer)
2. [perfectionist](https://github.com/ben-eb/perfectionist)