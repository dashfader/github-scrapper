const axios = require('axios')
const cheerio = require('cheerio')
const { Input } = require('enquirer')

const githubScrapping = async () => {
    try {
        const userPrompt = new Input({
            message: 'What is the github username?',
            initial: 'Fade-ing'
        })
        const username = await userPrompt.run()
        const response = await axios.get(`https://github.com/${username}`)
        const $ = cheerio.load(response.data)
    
        const name = $('span.p-name').text().trim()
        const avatarUrl = $('img.avatar').attr('src')
        const description = $('div.p-note').attr('data-bio-text')
        const followersCount = $(`[href=https://github.com/${username}?tab=followers]>span.text-bold.color-fg-default`).text()
        const followingCount = $(`[href=https://github.com/${username}?tab=following]>span.text-bold.color-fg-default`).text()
        console.log('Name :', name)
        console.log('Avatar URL :', avatarUrl)
        console.log('Description :', description)
        console.log(followersCount, 'followers')
        console.log(followingCount, 'following')
    } catch (error) {
        console.log('User not found!')
    }
}

githubScrapping()