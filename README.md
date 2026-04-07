# 💱 Simple Trading

Веб-приложение для наглядного просмотра **курса валют к рублю** по официальным данным **ЦБ РФ**. На главной можно переключать котировки **USD**, **EUR** и **CNY** (селект на странице); график и блоки статистики подтягивают данные для выбранной валюты.

---

## 📌 О проекте

Данные ЦБ РФ на клиент приходят через **`/api/cbr`**: так обходим CORS и не светим внешний endpoint в браузере.

Клиент — **TanStack Query** и [`useCurrencyData`](src/hooks/useCurrencyData.ts) (`quote`: USD / EUR / CNY). При смене валюты экран не пустеет (`keepPreviousData`); пока тянется новая серия, карточки [`LayerBlock`](src/shared/ui/layouts/layer-block.ts) уходят в **`$busy`** (полупрозрачность, без кликов). Сбой запроса не стирает последние удачные цифры; ошибку показывают **Snackbar** + **Alert** (MUI) на главной.

Кеш в памяти — см. [`query-provider`](src/app/query-provider.tsx) (`staleTime` порядка 10 минут); после перезагрузки страницы тот же горизонт даёт **`sessionStorage`** в [`cbr-api`](src/services/cbr-api.ts).

Отдельно — маршрут **«О проекте»**.

---

## 🗺️ Что уже есть и что дальше

| Сейчас                                         | Впереди                                |
| ---------------------------------------------- | -------------------------------------- |
| USD, EUR, CNY к RUB (ЦБ РФ), селект на главной | Другие инструменты и источники данных  |
| График и инфоблоки за ~3 месяца               | Таблица значений, экспорт, расширенные уведомления |
| Next.js App Router, TypeScript, TanStack Query | По мере необходимости                  |

---

## 🧰 Стек

- **Next.js** (App Router) — маршруты, API Route для прокси к ЦБ
- **React** + **TypeScript**
- **TanStack Query** (`@tanstack/react-query`) — кеш запросов на клиенте, хуки вроде `useQuery` (глобально `staleTime` / `gcTime` задаются в [`src/app/query-provider.tsx`](src/app/query-provider.tsx))
- **styled-components** — основная тема приложения, каркас и кастомные блоки (реестр для SSR — [`src/app/styled-registry.tsx`](src/app/styled-registry.tsx))
- **MUI Material** (`@mui/material`) + **Emotion** (`@emotion/react`, `@emotion/styled`) — готовые интерактивные примитивы и уведомления: кнопка, селект, **Snackbar** / **Alert**, обёртка **`ThemeProvider`** из `@mui/material/styles` в [`src/app/providers.tsx`](src/app/providers.tsx); токены MUI заданы в [`src/shared/config/mui-theme.ts`](src/shared/config/mui-theme.ts) и сосуществуют с темой styled-components
- **lightweight-charts** — график (виджет [`currency-chart`](src/widgets/currency-chart/index.tsx))
- **framer-motion** — анимации у [`LayerBlock`](src/shared/ui/layouts/layer-block.ts)
- **Yarn** — менеджер пакетов

---

## 📂 Структура папок

Кратко, что лежит в `src/` (без `node_modules` и служебных каталогов сборки):

```text
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # рендер главной (экран из screens/home)
│   ├── layout.tsx
│   ├── providers.tsx       # MUI + styled-components ThemeProvider, QueryProvider, Navbar
│   ├── query-provider.tsx  # QueryClientProvider, дефолты TanStack Query
│   ├── styled-registry.tsx # styled-components + SSR
│   ├── about/              # страница «О проекте»
│   └── api/cbr/            # прокси к XML ЦБ РФ
├── screens/                # страничные композиции (например home)
├── widgets/                # крупные блоки экрана: app-navbar, currency-chart
├── features/               # фичи с UI и моделью (например select-quote)
├── entities/               # доменные сущности и типы (quote)
├── shared/
│   ├── ui/                 # переиспользуемый UI: layouts (Container, Flexbox, LayerBlock…),
│   │                       # info-block, button (MUI), select (MUI), table
│   └── config/             # mui-theme.ts — тема MUI
├── hooks/                  # useCurrencyData(quote) — useQuery + разбор XML ЦБ
├── services/               # cbr-api: fetchCbrQuoteDynamics, коды VAL_NM_RQ
├── data/                   # статические данные (меню и т.п.)
├── theme/                  # тема styled-components, глобальные стили
├── utils/                  # разбор XML и прочее
├── assets/                 # шрифты, изображения
└── fantasticon/icons/      # исходные SVG для генерации иконочного шрифта
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

- Прокси к ЦБ: маршрут **`GET /api/cbr`** с обязательными `date_req1`, `date_req2` и параметром **`VAL_NM_RQ`** (код валюты в сервисе динамики ЦБ). Если `VAL_NM_RQ` не передан, на стороне API подставляется USD (`R01235`). Клиент для трёх котировок задаёт коды явно — см. `CBR_VAL_CODES` в [`src/services/cbr-api.ts`](src/services/cbr-api.ts): **USD** `R01235`, **EUR** `R01239`, **CNY** `R01375`.
- Клиентский вызов **`fetchCbrQuoteDynamics(from, to, quote)`** и **кеш `sessionStorage`** — в том же файле; ключ кеша учитывает полный query string и `NEXT_PUBLIC_CBR_API_BASE`.
- Если клиент должен ходить не на тот же origin, задайте **`NEXT_PUBLIC_CBR_API_BASE`** (без завершающего `/`) — базовый URL, к которому клиент добавит `/api/cbr?...`.

Отдельный **.NET-бэкенд** из монорепозитория здесь не поднимается: при появлении своего API настройте переменные `NEXT_PUBLIC_*` или прокси под вашу инфраструктуру.

---

## ✨ Иконочный шрифт (Fantasticon)

Добавьте SVG в **`src/fantasticon/icons/`**, затем выполните:

```bash
yarn icofont
```

Обновлённый шрифт окажется в **`src/assets/fonts/icofont`** и уже импортируется в проект.
