setInterval(get_menbers = async () => {
    const response = await fetch("/menbers");
    const text = await response.text();
    const menbers = JSON.parse(text);
    let attend_menbers = "";
    for(const menber of menbers){
        if(menber.statas === "attendance"){
            attend_menbers += `<li>${menber.name}</li>`;
        }
    }
    document.getElementById("attend_list").innerHTML = attend_menbers;
}, 1000);

const exit = async () => {
    const param = document.location.search;
    const response = await fetch("/exit"+param);
}

const attend = async () => {
    const param = document.location.search;
    const response = await fetch("/attend"+param);
}