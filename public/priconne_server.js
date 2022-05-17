

let grades = []
let score10 = []
let score8 = []
let score7 = []
let mScore1 = []
let mScore2 = []
let mScore3 = []

function start(){
    grades.push(document.getElementById('one'));
    grades.push(document.getElementById('two'));
    grades.push(document.getElementById('three'));
    grades.push(document.getElementById('seven'));
    grades.push(document.getElementById('eight'));
    grades.push(document.getElementById('nine'));
    for(let i = 0; i < grades.length; i++)
        grades[i].style.display = 'block';
    let css = '.items:hover{background: }'
}

function readMe(){
    alert("전송한 결과는 통계에 바로 반영됩니다.\n괄호에 적힌 숫자만큼 선택해주시기 바랍니다. \n단, 불호(마이너스 점수)는 정해진 것보다 적게 선택하거나 선택하지 않는것이 가능합니다.");
}
function displayByStar(star){
    let princess = document.getElementsByClassName(star);
    let s1 = document.getElementsByClassName('star1');
    let s2 = document.getElementsByClassName('star2');
    let s3 = document.getElementsByClassName('star3');
    if(princess[0] === undefined){
        s2[0].style.display = 'inline';
        s3[0].style.display = 'inline';
        s1[0].style.display = 'inline';
    }
    else if(princess[0] === s1[0]){
        s1[0].style.display = 'inline';
        s2[0].style.display = 'none';
        s3[0].style.display = 'none';
    }
    else if(princess[0] === s2[0]){
        s2[0].style.display = 'inline';
        s1[0].style.display = 'none';
        s3[0].style.display = 'none';
    }
    else if(princess[0] === s3[0]){
        s3[0].style.display = 'inline';
        s1[0].style.display = 'none';
        s2[0].style.display = 'none';
    }
}

function displayGrade(g){
    let grade = document.getElementById(g);
    if(grade == undefined){
        for(let i = 0; i < grades.length; i++)
            grades[i].style.display = 'block';
    }
    else{
        for(i = 0; i < grades.length; i++)
            if(grade == grades[i])
                grades[i].style.display = 'block';
            else
                grades[i].style.display = 'none';
    }
}

function addItem(selected){
    let cnt = 0;
    let grade;
    for(let i = 0; i < grades.length; i++){
        if(grades[i].style.display == 'block'){
            cnt++;
            grade = grades[i];
            if(cnt >= 2) break;
        }
    }
    if(cnt >= 2){
        alert("점수 결정 후 선택해주세요.");
        return;
    }
    let selectedChar = selected.parentNode.textContent.trim();
    grade.innerHTML += "<a id='" + selectedChar + "'class=\"selectedImg\" onclick=\"removeItem(this)\"><img src='" + selected.src + "'></a>";
    selected.parentNode.style.display = 'none';
}

function removeItem(el){
    el.remove();
    let ib = document.getElementsByClassName("imgbox");
    for(let i = 0; i < ib.length; i++){
        if(ib[i].textContent.trim() == el.id){
            ib[i].removeAttribute('style');
            break;
        }
    }
}

function clearAll(){
    let a = document.getElementsByClassName("selectedImg");
    let b = document.getElementsByClassName("imgbox");
    while(a.length != 0)
        a[0].remove();
    for(let i = 0; i < b.length; i++)
        b[i].removeAttribute('style');
    console.log(a);
}

function show(){
    console.log(mScore1);
    console.log(mScore2);
    console.log(mScore3);
    console.log(score10);
    console.log(score8);
    console.log(score7);
}

function showLen(){

    let si = document.getElementsByClassName('selectedImg');
    for(let i = 0; i < si.length; i++){
        console.log(si[i]);
        console.log(si[i].parentNode.childNodes[0].textContent);
        console.log(si[i].id);
    }
}
function clearArr(){
    score10.length = 0;
    score8.length = 0;
    score7.length = 0;
    mScore1.length = 0;
    mScore2.length = 0;
    mScore3.length = 0;
}
function send(){
    let si = document.getElementsByClassName('selectedImg');
    for(let i = 0; i < si.length; i++){
        let siScore = si[i].parentNode.childNodes[0].textContent;
        if(siScore === "10") score10.push(si[i].id);
        else if(siScore === "8") score8.push(si[i].id);
        else if(siScore === "7") score7.push(si[i].id);
        else if(siScore === "-3") mScore3.push(si[i].id);
        else if(siScore === "-2") mScore2.push(si[i].id);
        else if(siScore === "-1") mScore1.push(si[i].id);
    }
    let valid = (score10.length == 1 && score8.length == 2 && score7.length == 3 && mScore1.length <= 3 && mScore2.length <= 2 && mScore3.length <= 1);
    if(valid===true){
        if (confirm("제출 후 수정이 불가능합니다. 제출하시겠습니까?") == true){
            let data = JSON.stringify({
                "s10": score10,
                "s8" : score8,
                "s7" : score7,
                "m1" : mScore1,
                "m2" : mScore2,
                "m3" : mScore3
            });
            let requestOptions ={
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: data
            }
            fetch("http://localhost:8080/add", requestOptions)
            .then(response=>response.json())
            .then(json=>{
                console.log(json);
            })
            console.log('good');
            clearAll();
            window.location.replace("http://localhost:8080/result");
        }
        else{
            clearArr();
            return;
        }
    }
    else{
        clearArr();
        alert('숫자에 맞게 선택해주세요.');
    }
}

function drawWidth(){
    let barGraph = document.getElementsByClassName('barGraph');
    for(let i = 0; i < barGraph.length; i++){
        barGraph[i].style.width = barGraph[i].textContent + "px";
        barGraph[i].style.background = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
}
