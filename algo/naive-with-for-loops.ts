import { Article, Family } from "../types"

export function getArticlesByFamily(families: Family[], articles: Article[]): Record<number, Article[]> {
    const articlesByFamily: Record<number, Article[]> = {}

    // Parcours des articles
    for (let article of articles) {
        let articleFamily: Family | undefined

        // Association des articles aux familles
        for(let family of families) {
            if (article.familyId === family.id) {
                articleFamily = family
            }
        }

        if (!articleFamily) throw new Error('Missing family')

        // Construction de la structure finale
        if (!articlesByFamily[articleFamily.id]) articlesByFamily[articleFamily.id] = []
        articlesByFamily[articleFamily.id].push(article)
    }

    return articlesByFamily
}