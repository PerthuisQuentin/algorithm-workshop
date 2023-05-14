import { Article, Family } from "../types"

export function getArticlesByFamily(families: Family[], articles: Article[]): Record<number, Article[]> {
    const familiesById: Record<number, Family> = {}

    families.forEach(family => {
        familiesById[family.id] = family
    })

    return articles.reduce((articlesByFamily, article) => {
        const articleFamily = familiesById[article.familyId]

        if (!articleFamily) throw new Error('Missing family')

        if (!articlesByFamily[articleFamily.id]) articlesByFamily[articleFamily.id] = []
        articlesByFamily[articleFamily.id].push(article)

        return articlesByFamily
    }, {})
}