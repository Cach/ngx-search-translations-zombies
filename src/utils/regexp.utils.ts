export const makeRegExp = (value: string): RegExp => {
  return new RegExp(`['|"]${ value.replace(/\./gi, '\\.') }['|"]`, 'gi');
}
