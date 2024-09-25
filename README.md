## Парсер sql в mermaid.

Если вы знаете нормальный парсер sql, то сообщите о нем, пожалуйста.
(Яп на которых может быть реализован парсер: Golang, JS/желательно TS и Питонизде)
Ибо хуета которая здесь юзается сломана. В общем как и весь яп,
который написали на коленках за 6 дней, а на 7 пили смузи.

## Конструкции с которыми не робит это говно:

Уникальные индексы, но обычные работают (благодарности [сюда](https://github.com/taozhi8833998/node-sql-parser)):
```sql
CREATE UNIQUE INDEX ...
```

GENERATED ALWAYS AS IDENTITY:
```sql
CREATE TABLE ... (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ...
);
```
