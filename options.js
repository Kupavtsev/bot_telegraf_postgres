module.exports = {

    priceOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [                          // Каждый вложенный массив это отдельная строка
                                                        // callback_data: Информация, которая вернется на Сервер 
                                                        // при нажатии этой кнопки
                [{text: '100', callback_data: '100'}, {text: '200', callback_data: '200'}, {text: '300', callback_data: '300'}],      
                [{text: '400', callback_data: '400'}, {text: '500', callback_data: '500'}, {text: '600', callback_data: '600'}]      
            ]                                                           
        })
    },
    
    hotPriceOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Указать горячую цену?', callback_data: '/hotPrice'}]
            ]                                                           
        })
    }

}