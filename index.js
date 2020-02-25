// const dataBtn = document.getElementById("data-button");
// const ul = document.getElementById("output");
//
//
//
//
// dataBtn.addEventListener('click', loadData);
// function loadData() {
//
//     let xhr = new XMLHttpRequest();
//
//     xhr.open('GET', '\n' +
//         'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json', true);
//
//     xhr.onload = function () {
//         getData(xhr.responseText);
//     };
//     xhr.send();
// }
// function getData(data) {
//     let dataArr = JSON.parse(data),
//         captions = Object.keys(dataArr[0]);
//
//     dataArr.forEach((ele, index) => {
//
//         if(index <=5) {
//             const li = document.createElement("li");
//             li.classList.add("list-item","card");
//             const personname = document.createElement("div");
//             personname.classList.add("name","card-header");
//             const sport = document.createElement("div");
//             sport.classList.add("sport","card-title");
//             const age = document.createElement("div");
//             age.classList.add("age");
//             const country = document.createElement("div");
//             country.classList.add("class","country");
//             const year = document.createElement("div");
//             year.classList.add("class","year");
//             const medal = document.createElement("div");
//             medal.classList.add("class","total-medals");
//
//             personname.textContent = ele[captions[0]];
//             sport.textContent = ele[captions[5]];
//             age.textContent = ele[captions[1]];
//             country.textContent = ele[captions[2]];
//             year.textContent = ele[captions[3]];
//             medal.textContent = ele[captions[6]];
//
//             const cardBody = document.createElement("div");
//             cardBody.classList.add("class", "card-body");
//             li.appendChild(personname);
//             cardBody.appendChild(sport);
//             cardBody.appendChild(age);
//             cardBody.appendChild(country);
//             cardBody.appendChild(year);
//             cardBody.appendChild(medal);
//             li.appendChild(cardBody);
//             //Send to the html
//             ul.appendChild(li);
//         }
//
//     });
// }
//
