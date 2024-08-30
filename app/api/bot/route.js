export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import { Bot, webhookCallback } from 'grammy'

const token = process.env.TELEGRAM_BOT_TOKEN

if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')



const bot = new Bot(token)
// bot.command('start', async (ctx) => {
//     await ctx.reply('Welcome')
// })

bot.command('start', async (ctx) => {
    const userId = ctx.from.id; // Get the user's Telegram ID
    const username = ctx.from.username; // Get the user's username


    const url = `https://t.me/Nonagonbot/nonagon`;
    const refUrl = `https://t.me/WasquoBot/wasquocoin?start=referral_123`
    await ctx.reply(`Welcome!${username} , your id is ${userId} Click the button below to visit the web app. 
                          ${refUrl}, refeal ${referralCode}`,  {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Visit Web App', url }]
            ]
        }
    });
});



export const POST = webhookCallback(bot, 'std/http')



