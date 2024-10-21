
const obterKeyUrl = (url) => {

    const indexOf = url.lastIndexOf('/')
    const key = url.slice(indexOf + 1)

    return key


}

module.exports = {
    obterKeyUrl
}