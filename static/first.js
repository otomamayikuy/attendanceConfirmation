const request = async () => {
    const response = await fetch("/menbers_number")
    const number = await response.text();
    document.getElementById("text").innerText = `あなたの会員番号は${number}です`
}
request()