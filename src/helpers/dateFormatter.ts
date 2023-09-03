const dateFormatter = (date: Date): string => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const formattedDay = day < 10 ? '0' + day : day.toString()
    const formattedMonth = month < 10 ? '0' + month : month.toString()

    return formattedDay + '-' + formattedMonth + '-' + year.toString()
}

export default dateFormatter
