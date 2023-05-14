import { Article, Family } from "../types"

export function getArticlesByFamily(families: Family[], articles: Article[]): Record<number, Article[]> {
    return articles.reduce((articlesByFamily, article) => {
        const articleFamily = families.find(family => article.familyId === family.id)
        if (!articleFamily) throw new Error('Missing family')

        if (!articlesByFamily[articleFamily.id]) articlesByFamily[articleFamily.id] = []
        articlesByFamily[articleFamily.id].push(article)
        
        return articlesByFamily
    }, {})
}