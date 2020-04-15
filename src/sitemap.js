const { readFileSync, createWriteStream } = require('fs')
const { SitemapStream } = require('sitemap')

const replaceAccents = str => {
  const replacedStr = str
    .replace(/[ăâ]/g, 'a')
    .replace(/[ĂÂ]/g, 'A')
    .replace(/[î]/g, 'i')
    .replace(/[Î]/g, 'I')
    .replace(/[ș]/g, 's')
    .replace(/[Ș]/g, 'S')
    .replace(/[ț]/g, 't')
    .replace(/[Ț]/g, 'T')
  return replacedStr
}

let urls = [
  {
    url: '/',
    changefreq: 'never',
  },
]

const list = JSON.parse(readFileSync('./public/json/cuprins.json', 'utf8'))
list.map(folder => {
  folder.p.map(file => {
    urls.push({
      url:
        '/' +
        file.n +
        '-' +
        replaceAccents(file.t)
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/-+/g, '-'),
      changefreq: 'never',
    })
  })
})

const sitemap = new SitemapStream({
  hostname: 'https://www.poeziitraiandorz.ro',
})

const writeStream = createWriteStream('./public/sitemap.xml')

sitemap.pipe(writeStream)

urls.forEach(url => {
  sitemap.write(url)
})

sitemap.end()
