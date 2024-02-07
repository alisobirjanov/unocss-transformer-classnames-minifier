export const defaultChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function variationsChars(chars: string = defaultChars) {
  const variation = [-1]
  const charsLastIdx = chars.length - 1

  const changeArrayElemsFromIdxToEnd = (idx: number) => {
    for (let i = idx; i < variation.length; i++)
      variation[i] = 0
  }

  const getVariation = () => {
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

  return getVariation
}

// const getVar = variationsChars()

// for (let i = 0; i < 100; i++)
//   getVar()


// function variationsChars() {
//   const variation = [0]
//   let currentIdx = 0
//   const lastIdx = defaultChars.length - 1

//   const changeArrayElemsFromIdxToEnd = (idx: number) => {
//     for (let i = idx; i < variation.length; i++)
//       variation[i] = 0
//   }

//   const getVariation = () => {
//     if (currentIdx === 0 && variation[0] === lastIdx) {
//       changeArrayElemsFromIdxToEnd(0)
//       variation.push(0)
//       currentIdx = variation.length - 1
//       return variation
//     }

//     if (variation[currentIdx] === lastIdx) {
//       currentIdx -= 1
//     }

//     variation[currentIdx] += 1

//     return variation
//   }
// }


// /\$t\(\s*(["'\`])(.*?)\1|\)/gm


// /\$t\(\s*(["'\`])(.*?)\1(\,?.*?)\)/gm

// /\$t\(\s*(["'\`])(.*?)\1\s*(\,.*?)?\)/gm