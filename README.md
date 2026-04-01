# 💱 Simple Trading

Веб-приложение для наглядного просмотра **курса валют**. Сейчас в фокусе пара **рубль ↔ доллар США** (официальные данные **ЦБ РФ**). В планах — **переключение между активами** (другие валюты и инструменты) без смены общей логики интерфейса.

---

## 📌 О проекте

На главной странице собраны график динамики, таблица значений и информационные блоки — всё завязано на данные Центробанка. Запросы к внешнему API идут через **собственный маршрут** приложения (`/api/cbr`), чтобы обойти ограничения браузера (CORS) и держать единую точку входа к источнику курсов.

Данные на клиенте запрашиваются через **TanStack Query**: в рамках одной сессии без перезагрузки ответы кешируются в памяти (`staleTime` ~10 минут). Чтобы при **полном обновлении страницы** не дублировать сетевой запрос в тот же период, ответ прокси дополнительно кешируется в **`sessionStorage`** в [`src/services/cbr-api.ts`](src/services/cbr-api.ts) с тем же горизонтом.

**Страница «О проекте»** — отдельный маршрут с поясняющим контентом.

---

## 🗺️ Что уже есть и что дальше

| Сейчас                                          | Впереди                           |
| ----------------------------------------------- | --------------------------------- |
| Курс USD/RUB по данным ЦБ РФ                    | Выбор актива (валюты и др.) в UI  |
| График и таблица по диапазону                   | Расширение списка инструментов    |
| Next.js App Router, TypeScript, TanStack Query  | Улучшения UX под мультивалютность |

---

## 🧰 Стек

- **Next.js** (App Router) — маршруты, API Route для прокси к ЦБ
- **React** + **TypeScript**
- **TanStack Query** (`@tanstack/react-query`) — кеш запросов на клиенте, хуки вроде `useQuery` (глобально `staleTime` / `gcTime` задаются в [`src/app/query-provider.tsx`](src/app/query-provider.tsx))
- **styled-components** — тема и компоненты (реестр стилей для SSR — [`src/app/styled-registry.tsx`](src/app/styled-registry.tsx))
- **lightweight-charts** — график
- **Yarn** — менеджер пакетов

---

## 📂 Структура папок

Кратко, что лежит в `src/` (без `node_modules` и служебных каталогов сборки):

```text
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # главная (HomePage)
│   ├── layout.tsx
│   ├── providers.tsx       # ThemeProvider, Navbar, QueryProvider
│   ├── query-provider.tsx  # QueryClientProvider, дефолты TanStack Query
│   ├── styled-registry.tsx # styled-components + SSR
│   ├── about/              # страница «О проекте»
│   └── api/cbr/            # прокси к XML ЦБ РФ
├── components/             # UI и страничные блоки
│   ├── Blocks/InfoBlock/
│   ├── Charts/Chart/
│   ├── Layouts/            # Container, Flexbox, LayerBlock, Space
│   ├── Table/
│   └── ui/                 # Button, Input, Navbar
├── hooks/                  # useCurrencyData (useQuery + данные ЦБ)
├── services/               # клиент к `/api/cbr` (cbr-api)
├── data/                   # демо-данные при необходимости
├── theme/                  # тема, глобальные стили, миксины
├── utils/                  # разбор XML и прочее
├── assets/                 # шрифты, изображения
├── fantasticon/icons/      # исходные SVG для генерации иконочного шрифта
└── …                       # store, server, pages — по мере развития проекта
```

`public/` — статика для Next.js. Сгенерированные файлы иконочного шрифта после `yarn icofont` попадают в `src/assets/fonts/icofont/` (уже подключены в проект).

---

## 🚀 Быстрый старт

1. Установите зависимости:

    ```bash
    yarn install
    ```

2. Запустите режим разработки:

    ```bash
    yarn dev
    ```

3. Откройте в браузере: [http://localhost:3000](http://localhost:3000)

Сборка для продакшена: `yarn build`, затем `yarn start`.

---

## ⚙️ Полезные команды

| Команда          | Назначение                                   |
| ---------------- | -------------------------------------------- |
| `yarn dev`       | Локальная разработка (hot reload)            |
| `yarn build`     | Продакшен-сборка                             |
| `yarn start`     | Запуск собранного приложения                 |
| `yarn lint`      | Проверка ESLint                              |
| `yarn lint:fix`  | Автоисправления ESLint, где возможно         |
| `yarn typecheck` | Проверка типов TypeScript без emit           |
| `yarn pretty`    | Форматирование кода через Prettier           |
| `yarn test`      | Заглушка тестов (при необходимости замените) |

Команда **`yarn eject`** из шаблона Create React App в этом проекте **не используется** — конфигурация идёт через Next.js и привычные конфиг-файлы в корне.

---

## 🔌 API и окружение

- Прокси к ЦБ: маршрут **`GET /api/cbr`** с параметрами `date_req1`, `date_req2`, опционально `VAL_NM_RQ` (по умолчанию код USD — `R01235`).
- Клиентский вызов и **кеш `sessionStorage`** (10 минут) — в [`src/services/cbr-api.ts`](src/services/cbr-api.ts); ключ кеша учитывает параметры запроса и `NEXT_PUBLIC_CBR_API_BASE`.
- Если клиент должен ходить не на тот же origin, задайте **`NEXT_PUBLIC_CBR_API_BASE`** (без завершающего `/`) — базовый URL, к которому клиент добавит `/api/cbr?...`.

Отдельный **.NET-бэкенд** из монорепозитория здесь не поднимается: при появлении своего API настройте переменные `NEXT_PUBLIC_*` или прокси под вашу инфраструктуру.

---

## ✨ Иконочный шрифт (Fantasticon)

Добавьте SVG в **`src/fantasticon/icons/`**, затем выполните:

```bash
yarn icofont
```

Обновлённый шрифт окажется в **`src/assets/fonts/icofont`** и уже импортируется в проект.
