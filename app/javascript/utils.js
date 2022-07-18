export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}