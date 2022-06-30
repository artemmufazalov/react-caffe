# React Pizza

Проект создан с помощью утилиты [Create React App](https://github.com/facebook/create-react-app).

Выполнена логика фильтрации по категориям, сортировки, поиска по значению, добавления в корзину.<br/>
Данные запрашиваются с MockAPI.

Проект выполнен в рамках курса [React Pizza](https://www.youtube.com/watch?v=_UywBskWJ7Q&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl) на YouTube.

### Стек:
* TypeScript
* React, Redux Toolkit

## Доступные команды

В директории проекта вы можете запустить:

### `npm start`

Запускает приложение в режиме разработки по адресу [http://localhost:3000](http://localhost:3000)

### `npm run pretty`
Запускает prettier для всех файлов проекта. Конфигурация в файле .prettierrc. Игнорирует файлы, указанные в .prettierignore. 

### `npm run prepare`
Инициализирует pre-commit git хук c husky, хук  запускает prettier для файлов коммита.
