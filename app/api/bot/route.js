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
    const urlX = `https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09`
    await ctx.reply(`Hey, @${username} , NONAGON is a community-driven Dapp where you choose the future of Nonagon token. \nInvite your friends, relatives and co-workers to join the game. The more friends you invites, the more coin you earn `,  {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Play', url }],
                [{ text: 'Join NONAGON Telegram Community', url }],
                [{ text: 'Join NONAGON X Community', url: urlX }]
            ]
        },
    
    });
});



export const POST = webhookCallback(bot, 'std/http')



