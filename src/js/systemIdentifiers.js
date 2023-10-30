export function range(from, to, step = 1) {
  return {
    * [Symbol.iterator]() {
      for (let val = from; val < to; val += step) {
        yield val;
      }
    },
  };
}

export function visa(number) {
  return String(number).startsWith('4');
}

export function amex(number) {
  const n = [34, 37];
  return n.some((el) => String(number).startsWith(String(el).slice(0, String(number).length)));
}

export function discover(number) {
  const n = [601, 644, 645, 646, 647, 648, 649, 65, ...range(622126, 622925)];
  return n.some((el) => String(number).startsWith(String(el).slice(0, String(number).length)));
}

export function jcb(number) {
  const n = [...range(3528, 3590)];
  return n.some((el) => String(number).startsWith(String(el).slice(0, String(number).length)));
}

export function maestro(number) {
  const n = [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763];
  return n.some((el) => String(number).startsWith(String(el).slice(0, String(number).length)));
}

export function masterCard(number) {
  const n = [51, 52, 53, 54, 55, ...range(2221, 2721)];
  return n.some((el) => String(number).startsWith(String(el).slice(0, String(number).length)));
}

export function mir(number) {
  const n = [...range(2200, 2204)];
  return n.some((el) => String(number).startsWith(String(el).slice(0, String(number).length)));
}

export function visaElectron(number) {
  const n = [4026, 417500, 4508, 4844, 4913, 4917];
  return n.some((el) => String(number).startsWith(String(el).slice(0, String(number).length)));
}
