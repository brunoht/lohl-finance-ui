import moment from "moment"

export function format(date){
    return moment.utc(date).format('DD/MM/YYYY')
}

export function unformat(date){
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
}