import { faker } from '@faker-js/faker'
import { writeFileSync } from 'fs'

import { Family, Article } from './types'

const itemCount = process.argv[2] ? parseInt(process.argv[2]) : 100

const families: Family[] = []

for (let i = 0; i < itemCount; i++) {
    families.push({
        id: i,
        label: faker.commerce.department()
    })
}

writeFileSync('./data/families.json', JSON.stringify(families, null, 4))

const articles: Article[] = []

for (let i = 0; i < itemCount; i++) {
    articles.push({
        id: i,
        familyId: faker.datatype.number({ min: 0, max: itemCount - 1 }),
        quantity: faker.datatype.number({ min: 0, max: 99 }),
        label: faker.commerce.productName()
    })
}

writeFileSync('./data/articles.json', JSON.stringify(articles, null, 4))

import { getArticlesByFamily } from './algo/naive-with-for-loops'

writeFileSync('./data/result.json', JSON.stringify(getArticlesByFamily(families, articles), null, 4))