export const replaceAccents = str => {
  const replacedStr = str
    .replace(/[ăâ]/g, 'a')
    .replace(/[ĂÂ]/g, 'A')
    .replace(/[î]/g, 'i')
    .replace(/[Î]/g, 'I')
    .replace(/[ș]/g, 's')
    .replace(/[Ș]/g, 'S')
    .replace(/[ț]/g, 't')
    .replace(/[Ț]/g, 'T')
  return replacedStr
}

export const mobileTap = (mq, cb) => {
  const tapMQ = window.matchMedia(`(max-width: ${mq}px)`)
  if (tapMQ.matches) cb()
}
