const TelegramApi = require('node-telegram-bot-api')
// const {gameOptions, againOptions} = require('/options')

const token = '1835665140:AAGps0TPKOKDNOcj_U9tz3TFdaj6UI-7TDU'

const bot = new TelegramApi(token, {polling: true})


const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [                          // Каждый вложенный массив это отдельная строка
                                                    // callback_data: Информация, которая вернется на Сервер 
                                                    // при нажатии этой кнопки
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],      
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],      
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}]
        ]                                                           
    })
}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Играть еще раз', callback_data: '/again'}]
        ]                                                           
    })
}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Я загадал цифру от 0 до 9, угадай какую!')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;   // По ключу добавляем сгенерированное число
    await bot.sendMessage(chatId, 'Отгадывай!', gameOptions)
}


const start = () => {
    bot.setMyCommands( [
        {command: '/start', description: 'начальное приветсиве'},
        {command: '/info', description: 'получить информацию о пользователе'},
        {command: '/game', description: 'игра - угадай число'}
    ])
    
    bot.on('message', async msg=> {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.ru/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/192/1.webp')
            return bot.sendMessage(chatId, `Добро пожаловать, почем железо ?`);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
        }
        if (text === '/game') {
           return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебе не понимаю, напиши по другому...')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId);
        }

        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Угадал! ${chats[chatId]}`, againOptions);
        } else {
            return await bot.sendMessage(chatId, `Не верно! Бот загодал ${chats[chatId]}`, againOptions);
        }
    })
}

start()