1. Telegram BOT
    * db.js - you need to specify your Postgres connection

    - BOT name:
        - tra-bot
    - node-telegram-bot-api
    
    - To start on localhost:
        - npm run dev

2. server
    * db.js - you need to specify your Postgres connection

    - Node Express
    - To start on localhost:
        - node index

3. client
    - React
    - To start on localhost:
        - npm start


Телеграм бот создает БД в Postgres, при старте просит ввести объявление и указать цену, выбрав из предложенных вариантов
Потом предлагает указать горячую цену и перезаписывает предыдущую цену.

Объявления отображаются в течении 5 мин.