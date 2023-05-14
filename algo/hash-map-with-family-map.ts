import { Article, Family } from "../types"

export function getArticlesByFamily(families: Family[], articles: Article[]): Record<number, Article[]> {
    const familiesById: Map<number, Family> = new Map()
    const articlesByFamily: Record<number, Article[]> = {}

    for (let family of families) {
        familiesById.set(family.id, family)
    }

    for (let article of articles) {
        const articleFamily = familiesById.get(article.familyId)

        if (!articleFamily) throw new Error('Missing family')

        if (!articlesByFamily[articleFamily.id]) articlesByFamily[articleFamily.id] = []
        articlesByFamily[articleFamily.id].push(article)
    }

    return articlesByFamily
}