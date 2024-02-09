export const defaultChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function variationsChars(chars: string = defaultChars) {
  const variation = [-1]
  const charsLastIdx = chars.length - 1

  const changeArrayElemsFromIdxToEnd = (idx: number) => {
    for (let i = idx; i < variation.length; i++)
      variation[i] = 0
  }

  return () => {
    let idx = 0
    for (let i = variation.length - 1; i >= 0; i--) {
      if (variation[i] !== charsLastIdx) {
        variation[i] += 1
        idx = i + 1
        break
      }
      if (i === 0) {
        variation.push(0)
        break
      }
    }
    changeArrayElemsFromIdxToEnd(idx)
    return variation.map(i => chars[i]).join('')
  }
}

// /\$t\(\s*(["'\`])(.*?)\1|\)/gm

// /\$t\(\s*(["'\`])(.*?)\1(\,?.*?)\)/gm

// /\$t\(\s*(["'\`])(.*?)\1\s*(\,.*?)?\)/gm

// /(["'`])(.*?)\1/g
