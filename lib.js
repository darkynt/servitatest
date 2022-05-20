import {isEmpty, identity, filter, map, reduce, compose, fromPairs, prop} from 'ramda'

const LEGALLY_UNLIKELY_DATE = new Date('1700-01-01') // TODO: start of the NHS? 

export const flattenExtensionsArray = (inputArray = []) => {
    return inputArray.reduce((acc = [], cur = {}, i) => {
        const { extension, valuePeriod, valueCoding } = cur
        const start = valuePeriod?.start
        let additionalExtensions = [] // refactor this out
        if (extension) {
            additionalExtensions = flattenExtensionsArray(extension) // TODO: trampoline
        }
        if (valuePeriod?.extension) {
            additionalExtensions = [...flattenExtensionsArray(valuePeriod.extension)] // TODO: trampoline
        }
        const newItem = {
            ...(valuePeriod && {valuePeriod}),
            ...(valueCoding && {valueCoding}),
            ...(start && {start})
        }
        const buildList = [...acc, {...newItem}, ...additionalExtensions]

        return buildList
    }, [])
}

const withoutEmpty = compose(
    filter((obj) => !isEmpty(obj)), //removes defined but empty objects
    filter(identity) // removes undefineds
)

/* NB: this format despite not being used here well (yet) allows us to unit test the hell out of each of our steps by exporting them */

const extractStart = prop('start')
const extractValueCoding = prop('valueCoding')

const getMinStart = reduce((acc, cur) => (cur > acc ? acc : cur), LEGALLY_UNLIKELY_DATE) // would probably go back and look at the ramda docs for a max/min(list) function tbh

const getMaxStart = reduce((acc, cur) => (cur < acc ? acc : cur), LEGALLY_UNLIKELY_DATE)

const valueCodingToObjTuples = ({code, display}) => [`code-${code}`, display] // avoid sparse array problem - also didn't know which way we wanted to look them up
const tapLog = msg => value => {
    console.log({msg, value})
    return value
}
/* CPU intensive having to run this whole flow 3 times, but I don't know whether the elements here will want to be reused and will diverge so I trust fast computers over my capacity to debug multi-purpose
control flows, also I didn't want to declare any new objects within this lib initially */
const minimumStartFromRootObject = compose(
    getMinStart,
    tapLog('min - onlyStarts'),
    withoutEmpty,
    tapLog('min - extractStart'),
    map(extractStart),
    tapLog('min - emptiedArray'),
    withoutEmpty,
    flattenExtensionsArray,
)

const maxStartFromRootObject = compose(
    getMaxStart,
    withoutEmpty,
    map(extractStart),
    withoutEmpty,
    flattenExtensionsArray,
)
/* Good place for typescript, there, I said a nice thing about typescript xD */
const valueCodingsFromRootObject = compose(
    fromPairs,
    tapLog('extractValueCoding to tuples'),
    map(valueCodingToObjTuples),
    tapLog('extractValueCoding to tuples'),
    withoutEmpty,
    tapLog('extractValueCoding'),
    map(extractValueCoding),
    withoutEmpty,
    flattenExtensionsArray,
)


export const generateApiResponse = input => ({
    maxStart: maxStartFromRootObject(input),
    minStart: minimumStartFromRootObject(input),
    valueCodings: valueCodingsFromRootObject(input)
})


