const ul = document.getElementById("attend_list")
let lis = [];
setInterval(get_menbers = async () => {
    const response = await fetch("/menbers");
    const text = await response.text();
    const menbers = JSON.parse(text);
    let attend_menbers = [];
    for(const li of lis){
        li.remove()
    }
    lis.length = 0;
    for(const menber of menbers){
        if(menber.statas === "attendance"){
            attend_menbers.push(menber);
        }
    }
    for(const attend_menber of attend_menbers){
        lis.push(document.createElement("li"));
        lis[lis.length-1].innerText = attend_menber.name
        ul.appendChild(lis[lis.length-1]);
    }
}, 200);

const save = async () => {
    const param = document.location.search;
    const response = await fetch("/save"+param);
    const text = await response.text();
    localStorage.setItem("info",text);
}
const exit = async () => {
    const param = document.location.search;
    const response = await fetch("/exit"+param);
}

const attend = async () => {
    const param = document.location.search;
    const response = await fetch("/attend"+param);
}

const logout = async () => {
    const result = confirm("ログアウトしますか");
    if(result){
        const param = document.location.search;
        const response = await fetch("/exit"+param);
        location = "/home";
    }
}

function edit() {
    const edit_text = document.getElementById("edit_text");
    const name_box = document.createElement("input");
    name_box.id = "name_box";
    const name_button = document.createElement("button");
    name_button.innerText = "登録";
    edit_text.innerText = "変更後の名前を入力してください";
    edit_text.appendChild(name_box);
    edit_text.appendChild(name_button);
    name_button.onclick = edit_name;
}

const edit_name = async () => {
    const param = document.location.search;
    const name_box = document.getElementById("name_box")
    const new_name = name_box.value;
    const response = await fetch(`/edit_name${param}&new_name=${new_name}`);
    const number = await response.text();
    location = `/start?number=${number}&name=${new_name}`;
}

save()
const exit_button = document.getElementById("exit");
exit_button.onclick = exit;
const attend_button = document.getElementById("attend");
attend_button.onclick = attend;
const logout_button = document.getElementById("logout");
logout_button.onclick = logout;
const edit_button = document.getElementById("edit");
edit_button.onclick = edit;