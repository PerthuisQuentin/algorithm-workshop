import { Article, Family } from "../types"

export function getArticlesByFamily(families: Family[], articles: Article[]): Record<number, Article[]> {
    const articlesByFamily: Map<number, Article[]> = new Map()

    for (let article of articles) {
        let articleFamily: Family | undefined

        for(let family of families) {
            if (article.familyId === family.id) {
                articleFamily = family
            }
        }

        if (!articleFamily) throw new Error('Missing family')

        if (!articlesByFamily.has(articleFamily.id)) articlesByFamily.set(articleFamily.id, [])
        articlesByFamily.get(articleFamily.id)?.push(article)        
    }

    return Object.fromEntries(articlesByFamily)
}