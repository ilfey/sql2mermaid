## Начало работы

```sh
# Setup git hooks.
bun run prepare

# Install dependencies.
bun install

# Run project in dev env.
bun run dev
```

## Технологии

- Next (with turbopack)
- Effector
- TailwindCSS
- Typescript
- ESLint
- Bun
- FSD

## Методология

Используется методология FSD.

### Правила

- Если сегмент состоит из одного файла, то не нужно создавать директорию под этот сегмент. [Пример](/src/shared/factory.ts)
- Разделение слов в наименованиях слайсов реализовывать через `-`.
- Запрещены экспорты поумолчанию, если этого не требует Next.
- Все компоненты должны реализовываться через стрелочные функции см. [Сниппеты](#сниппеты).

## Соглашения о коммитах

Коммит должен начинаться с заглавной буквы и только на английском языке.
В противном случае у вас не получится создать коммит.

## Сниппеты

### rsc

```tsx
import React from 'react';

export const $TM_FILENAME_BASE$ = () => {
 return (
  <div>
   $END$
  </div>
 );
};

```

### rsi

```tsx
import React from 'react';

export const $TM_FILENAME_BASE$ = () => (
  <div>
    $END$
  </div>
);

```

### sep

```tsx

/* ===== $END$ ===== */

```
