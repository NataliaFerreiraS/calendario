const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".icons span");

//pegar nova data, busca ano e mês
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


const renderCalendar = () => {
    let firstDateofMonth = new Date(currYear,currMonth, 1).getDay(), //Pega o primeiro dia do mes
    lastDateofMonth = new Date(currYear,currMonth + 1, 0).getDate(); //Pega a última data do mes
    lastDayofMonth = new Date(currYear,currMonth, lastDateofMonth).getDay(); //Pega o último dia do mes
    lastDateofLastMonth = new Date(currYear,currMonth, 0).getDate(); //Pega a data anterior do mes anterior
    let liTag = "";

    for (let i = firstDateofMonth; i > 0; i--) { //criando tag li meses anteriores dos ultimos dias
        liTag += `<li class="inactive">${lastDateofLastMonth -i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { //criando tag li de todos os dias do mês recorrente
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i= lastDayofMonth; i < 6; i++) { //criando tag li dos primeiros dias do próximo mes
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => { //adiciona o click ao botão de próximo mês
        currMonth = icon.id === "prev" ? currMonth -1 : currMonth + 1;

        //mudar ano para o ANTERIOR se o mes atual for menor que 0, e o PRÓXIMO se o mes atual for maior que 11
        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar ();
    })
    
});
