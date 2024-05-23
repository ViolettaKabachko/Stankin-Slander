const ruDateFormat = (date) => {
    let arr = date.split("-")
    arr.reverse()
    return arr.join(".")
} 

export default ruDateFormat