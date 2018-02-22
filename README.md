# bank-list
Тестовый интерфейс для управления списком банков. Реализован на [vue.js](https://vuejs.org/).

## Функционал
- [x] Хранение данных в LocalStorage (для имитации асинхронности добавил setTimeout'ы в методы чтения/записи данных)
- [x] Вывод списка банков
- [x] Поиск банка по БИК или названию
- [x] Форма создания банка
- [x] Отзывчивый (адаптивный) интерфейс
- [x] Стили для печати
- [ ] Валидация вводимых данных (проверка БИК на уникальность, проверка пустых полей и т.д.)

## Демо
Демо можно посмотреть по [ссылке](https://ifelseapps.github.io/bank-list/).

## Установка
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
