const HttpGet = async (url) => {
    let options = {
        credentials: "include"
    }
    try {
        return await fetch(url, options)
    }
    catch {
        console.log("Failed to fetch")
    }
}

const HttpPost = async (url, body) => {
    let options = {
        credentials: "include",
        body: JSON.stringify(body),
        method: "POST",
        headers: {
            "Content-type": "application/json"
          }
    }
    try {
        return await fetch(url, options)
    }
    catch {
        console.log("Failed to fetch")
    }
}


export  {HttpGet, HttpPost};