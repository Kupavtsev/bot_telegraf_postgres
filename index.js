const TelegramApi = require('node-telegram-bot-api')
const {priceOptions, hotPriceOptions } = require('./options')

const sequelize = require('./db')
// const UserModel = require('./model')
const PriceModel = require('./model')

const token = '1835665140:AAGps0TPKOKDNOcj_U9tz3TFdaj6UI-7TDU'

const bot = new TelegramApi(token, {polling: true})


const choosePrice = async (chatId) => {
    await bot.sendMessage(chatId, 'Укажите цену:', priceOptions)
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Base connection has lost!')
    }

    bot.setMyCommands( [
        {command: '/start', description: 'начальное приветсиве'},
    ])
    
    bot.on('message', async msg=> {
        const text = msg.text;
        const chatId = msg.chat.id;
        const user = await PriceModel.findOne({chatId})
        // console.log(isEmpty(user));

        try {
            if (text === '/start') {

                // if (isEmpty(user)) {
                //     await PriceModel.create({chatId}) 
                // }
                await PriceModel.create({chatId})

                return bot.sendMessage(chatId, `Добро пожаловать, напишите ваше объявление: `);
            }
            if (text) {
                user.ad = text;
                await user.save();
                console.log(text);
                return choosePrice(chatId);
            }
            
            return bot.sendMessage(chatId, 'Я тебе не понимаю, напиши по другому...')
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая-то ошибка');
        }
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/hotPrice') {
            return choosePrice(chatId);
        }

        const user = await PriceModel.findOne({chatId})

        if (data) {
            user.price = data;
            await user.save();
            await bot.sendMessage(chatId, `Добавлено! ${data}`, hotPriceOptions);
            return bot.sendMessage(chatId, 'объявление будет закреплено, пока иной пользователь не даст горячую цену')
        }
    })
}

start()