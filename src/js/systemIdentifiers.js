export function range(from, to, step = 1){
    return {
        *[Symbol.iterator](){
            for(let val = from; val < to; val += step){
                yield val;
            }
        }
    }
}

export function visa(number) {
    return String(number).startsWith('4')
}

export function amex(number) {
    return [34, 37].some((el) => String(number).startsWith(String(el).slice(0, String(number).length)))
}

export function discover(number) {
    return [601, 644, 645, 646, 647, 648, 649, 65, ...range(622126, 622925)].some((el) => String(number).startsWith(String(el).slice(0, String(number).length)))
    
}

export function jcb(number) {
    return [...range(3528, 3590)].some((el) => String(number).startsWith(String(el).slice(0, String(number).length)))
}

export function maestro(number) {
    return [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763].some((el) => String(number).startsWith(String(el).slice(0, String(number).length)))
}

export function masterCard(number) {
    return [51, 52, 53, 54, 55, ...range(2221, 2720)].some((el) => String(number).startsWith(String(el).slice(0, String(number).length)))
}

export function mir(number) {
    return String(number).startsWith('2')
}

export function visaElectron(number) {
    return [4026, 417500, 4508, 4844, 4913, 4917].some((el) => String(number).startsWith(String(el).slice(0, String(number).length)))
}
