import { Article, Family } from "../types"

export function getArticlesByFamily(families: Family[], articles: Article[]): Record<number, Article[]> {
    const familiesById: Map<number, Family> = new Map()
    const articlesByFamily: Map<number, Article[]> = new Map()

    // Remplissage de la HashMap familiesById
    for (let family of families) {
        familiesById.set(family.id, family)
    }

    // Association des articles aux familles
    for (let article of articles) {
        const articleFamily = familiesById.get(article.familyId)

        if (!articleFamily) throw new Error('Missing family')

        if (!articlesByFamily.has(articleFamily.id)) articlesByFamily.set(articleFamily.id, [])
        articlesByFamily.get(articleFamily.id)?.push(article)
    }

    return Object.fromEntries(articlesByFamily)
}