export const checkForDuplicates = (array) => {
    const valuesAlreadySeen = []

    for (let i = 0; i < array.length; i++) {
        const value = array[i];

        if (valuesAlreadySeen.indexOf(value) !== -1) {
            return true
        }
        valuesAlreadySeen.push(value)
    }
    return false
}