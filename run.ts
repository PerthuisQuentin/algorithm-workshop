import { isEqual } from 'lodash'
import * as Chalk from 'chalk'

import { Family, Article } from './types'

// import * as familiesData from './data/simple-families.json'
// import * as articlesData from './data/simple-articles.json'
// import * as resultData from './data/simple-result.json'

import * as familiesData from './data/families.json'
import * as articlesData from './data/articles.json'
import * as resultData from './data/result.json'

import { getArticlesByFamily as naiveWithForLoops } from './algo/naive-with-for-loops'
import { getArticlesByFamily as naiveWithForLoopAndFind } from './algo/naive-with-for-loop-and-find'
import { getArticlesByFamily as naiveWithFindAndForEach } from './algo/naive-with-find-and-for-each'
import { getArticlesByFamily as naiveWithFindAndReduce } from './algo/naive-with-find-and-reduce'
import { getArticlesByFamily as naiveWithHashMap } from './algo/naive-with-map'
import { getArticlesByFamily as hashMapWithForLoops } from './algo/hash-map-with-for-loops'
import { getArticlesByFamily as hashMapWithMap } from './algo/hash-map-with-map'
import { getArticlesByFamily as hashMapWithForEachAndReduce } from './algo/hash-map-with-for-each-and-reduce'

function run(functionToRun: Function, expectedResult: any, families: Family[], articles: Article[]): { isOk: boolean, duration: number } {
    const begin = performance.now()
    const result = functionToRun(families, articles)
    const end = performance.now()
    return {
        isOk: isEqual(result, expectedResult),
        duration: (end - begin)
    }
}

function runALot(functionToRun: Function, expectedResult: any, families: Family[], articles: Article[], times: number = 1): { isOk: boolean, duration: number } {
    const results = []
    for (let i = 0; i < times; i++) {
        results.push(run(functionToRun, expectedResult, families, articles))
    }
    return {
        isOk: results.every(result => result.isOk),
        duration: results.reduce((acc, result) => acc + result.duration, 0) / results.length
    }
}

function runAndPrint(prefix: string, functionToRun: Function, expectedResult: any, families: Family[], articles: Article[], times: number = 0) {
    const { isOk, duration } = runALot(functionToRun, expectedResult, families, articles, times)
    const testResult = isOk ? Chalk.green('OK') : Chalk.red('KO')
    const resultLine = `${testResult} ${duration.toFixed(3).padStart(10)} ms`
    console.log(`[${prefix}] ${resultLine.padStart(58 - prefix.length)}`)
}

const times = process.argv[2] ? parseInt(process.argv[2]) : 0
const begin = performance.now()

runAndPrint('Naive with for loops', naiveWithForLoops, resultData, familiesData, articlesData, times)
// runAndPrint('Naive with for loop and find', naiveWithForLoopAndFind, resultData, familiesData, articlesData, times)
// runAndPrint('Naive with find and reduce', naiveWithFindAndReduce, resultData, familiesData, articlesData, times)
// runAndPrint('Naive with find and forEach', naiveWithFindAndForEach, resultData, familiesData, articlesData, times)
// runAndPrint('Naive with HashMap', naiveWithHashMap, resultData, familiesData, articlesData, times)
console.log('-------------------------------------------------------')

// runAndPrint('HashMap with for loops', hashMapWithForLoops, resultData, familiesData, articlesData, times)
runAndPrint('HashMap with map', hashMapWithMap, resultData, familiesData, articlesData, times)
// runAndPrint('HashMap with forEach and reduce', hashMapWithForEachAndReduce, resultData, familiesData, articlesData, times)

const end = performance.now()
console.log('-------------------------------------------------------')
console.log(`Total duration for ${times} execution(s): ${(end - begin).toFixed(3)} ms`)