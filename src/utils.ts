export const defaultChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function charCombinations(chars: string = defaultChars) {
  const combination = [-1]
  const charsLastIdx = chars.length - 1

  const resetFromIndex = (idx: number) => {
    for (let i = idx; i < combination.length; i++)
      combination[i] = 0
  }

  return () => {
    for (let i = combination.length - 1; i >= 0; i--) {
      if (combination[i] !== charsLastIdx) {
        combination[i] += 1
        resetFromIndex(i + 1)
        break
      }
      if (i === 0) {
        resetFromIndex(0)
        combination.push(0)
        break
      }
    }

    return combination.map(i => chars[i]).join('')
  }
}
