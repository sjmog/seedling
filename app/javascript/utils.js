// All utility functions
import { twMerge } from 'tailwind-merge'

export const capitalize = (sentence) => {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}

export const toSentence = (array, short = false) => {
  let sentence

  if(array.length == 0) { return "" }

  if(array.length == 1) {
    sentence = array[0]
  } else if(array.length == 2) {
    sentence = `${array[0]} and ${array[1]}`
  } else if(!short) {
    sentence = array.slice(0, array.length - 1).join(', ') + ", and " + array.slice(-1)
  } else {
    sentence = `${array[0]} and ${pluralize(array.length - 1, 'other')}`
  }

  return sentence;
}

export const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const removeDiacritics = (str) => {
  return str.replace(
    /([àáâãäå])|([çčć])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, 
    function (str, a, c, e, i, n, o, s, u, y, ae) {
      if (a) return 'a';
      if (c) return 'c';
      if (e) return 'e';
      if (i) return 'i';
      if (n) return 'n';
      if (o) return 'o';
      if (s) return 's';
      if (u) return 'u';
      if (y) return 'y';
      if (ae) return 'ae';
    }
  )
}

export const stripTags = (text, replacementCharacter="") => {
  return text
          .replace(/(<([^>]+)>)/gi, replacementCharacter)
          .replace(/(\&nbsp\;)/gi, " ")
          .trim();
}

export const countWords = (text) => {
  const filteredText = text.replace(/\s+/g, ' ')

  const words = filteredText.split(' ');

  return words.length;
}

export const excerpt = (text, wordLimit=6, suffix='...') => {
  const filteredText = text.replace(/\s+/g, ' ')

  if(countWords(filteredText) <= wordLimit) return filteredText

  const words = filteredText.split(' ');

  let result = ""
  for (let i = 0; i < wordLimit; i++) result = result + ` ${words[i]}`

  return (result + suffix).trim();
}

export const formatDateToAmPm = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? '0'+minutes : minutes;

  return `${hours}.${minutes}${ampm}`
}

export const pluralize = (number, word, includeNumber = true) => {
  const returnNumber = includeNumber ? `${new Intl.NumberFormat('en-GB').format(number)} `  : ''

  if(number === 1) { return `${returnNumber}${word}` };

  if(word === 'person') return `${returnNumber}people`
  if(word.charAt(word.length - 1) === 'y') return `${returnNumber}${word.slice(0, -1)}ies`

  return `${returnNumber}${word}s`
}

export const isEmptyString = (string) => !string || string === undefined || string.replace(/\s/g, "").length === 0

export const confirmDialog = (message) => {
  return new Promise((resolve, reject) => {
    const confirmed = window.confirm(message)

    return confirmed ? resolve(true) : resolve(false)
  })
}

export const getUrlExtension = url => url.split(/[#?]/)[0].split('.').pop().trim()

export const duration = seconds => `${ Math.floor(seconds / 60) }:${ `${Math.floor(seconds % 60)}`.padStart(2, '0') }`

export const randomString = (length = 5) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result;
}

export const today = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  return dd + '/' + mm + '/' + yyyy;
}

export const anHourAgo = () => {
  const HOUR = 1000 * 60 * 60
  return Date.now() - HOUR
}

export const queryParams = (params) => {
  const esc = encodeURIComponent

  return Object.keys(params)
               .map(k => `${esc(k)}=${esc(params[k])}`)
               .join('&')
}

export const median = (values) => {
  if(values.length === 0) return 0

  values.sort((a, b) => a - b)

  const half = Math.floor(values.length / 2)

  return (values.length % 2 === 0)
          ? values[half]
          : (values[half - 1] + values[half]) / 2.0
}

export const categoryTitles = (categories) => {
  if(categories === undefined || !categories || categories.length === 0) { return "no categories" }
  return toSentence(categories.map(category => category.title))
}

export const newAllocationNote = (entity, categories, prefix = 'Allocated', suffix = '') => {
  return `${prefix} ${entity?.title || "this entity"} to ${categoryTitles(categories)}${suffix}`
}

export const allocationNote = ({ allocation }, prefix='Allocated ', suffix='') => {
  if(!allocation) return `this entity to these categories`
  return `${prefix} ${allocation.entity.title} to ${categoryTitles(allocation.categories)}${suffix}`
}

/**
 * Modified from https://github.com/NotionX/react-notion-x/tree/master/packages/notion-utils
 * Robustly extracts the notion page ID from a notion URL or pathname suffix.
 *
 * Defaults to returning a UUID (with dashes).
 */
export const parsePageId = (url, { uuid } = {}) => {
  if(!url) return null

  url = url.split('?')[0]

  const pageIdRe = /\b([a-f0-9]{32})\b/
  const pageId2Re = /\b([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\b/

  const idToUuid = (id = '') => `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(16, 4)}-${id.substr(20)}`

  const match = url.match(pageIdRe)
  if(match) return uuid ? idToUuid(match[1]) : match[1]

  const match2 = url.match(pageId2Re)
  if(match2) return uuid ? match2[1] : match2[1].replace(/-/g, '')

  return null
}

export const titleize = sentence => {
  if(!sentence) return ''
  if(!sentence.split) return sentence

  return sentence
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ")
}

export const dndMove = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
}

export const dndReorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const objStrToJson = (str) => str.replace(/(\w+:)|(\w+ :)/g, (key) => '"' + key.substring(0, key.length - 1) + '":')

export const possessive = (name) => {
  const APOSTROPHE_CHAR = '’';

  if(name == '') return name

  var lastChar = name.slice(-1)
  var endOfWord = lastChar.toLowerCase() == 's' ? APOSTROPHE_CHAR : `${APOSTROPHE_CHAR}s`

  return `${name}${endOfWord}`
}

export const interpolate = (text, user, options = { showInterpolation: false }) => text.replace(/\$\{(.+)\}/, (match) => {
  const wrapped = (string) => options.showInterpolation ? `<span class="border-b border-gray-400 border-dotted">${string}</span>` : string

  switch(match) {
    case '${organization}': return wrapped(user?.organization?.name || 'your organization')
    case '${organisation}': return wrapped(user?.organization?.name || 'your organization')
    default: return wrapped(`<em>Unknown interpolated variable: ${ match }</em>`)
  }
})

export const humanize = (str) => {
  return str
      .replace(/^[\s_]+|[\s_]+$/g, '')
      .replace(/[_\s]+/g, ' ')
}

export const classNames = (...classes) => twMerge(classes.filter(Boolean).join(' '))

export const isInViewport = (element, offset = 0) => {
  if(!element) return false

  const top = element.getBoundingClientRect().top
  return !isAboveViewport(top, offset) && !isBelowViewport(top, offset)
}

export const isAboveViewport = (elementTop, offset = 0) => (elementTop + offset) < 0
export const isBelowViewport = (elementTop, offset = 0) => (elementTop - offset) > window.innerHeight


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}