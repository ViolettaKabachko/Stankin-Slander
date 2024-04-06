const HttpGet = async (url) => {
    let options = {
        credentials: "include"
    }
    let res = await fetch(url, options)
    return await res.json()
}

export default HttpGet;