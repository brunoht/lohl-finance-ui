export function format(number){
    return number.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}

export function unformat(number){
    return number
}