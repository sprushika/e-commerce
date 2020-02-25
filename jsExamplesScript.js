//
// const app = document.getElementById('root');
// app.setAttribute('class', 'card-body')
//
// /*Deep and shallow copy*/
// let obj = {a:1, b: {c:1}};
// // let target = Object.assign({}, obj);//Shallow copy
// let target = JSON.parse(JSON.stringify(obj))//deepcopy
// // obj.a = 3;
// obj.b.c = 3;
// //
// console.log("new");
// console.log(target);
// console.log("old");
// console.log(obj);


/*Prints integers in div with "count" as classname*/
// const a = document.getElementsByClassName("count");
// const arr = Array.from(a);
// arr.forEach((ele, i) => {
//     ele.textContent = i.toFixed();
// });
// console.log(arr);






//
// const logo = document.createElement('img');
// logo.src = 'logo.png';
//
// const container = document.createElement('div');
// container.setAttribute('class', 'container');
//
// app.appendChild(logo);
// app.appendChild(container);
//
// let request = new XMLHttpRequest();
//
// request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
//
// request.onload = function () {
//     var data = JSON.parse(this.response);
//     if(request.status >= 200 && request.status <400){
//         data.forEach(movie => {
//             const card = document.createElement('div');
//             card.setAttribute('class', 'card');
//
//             const title = document.createElement('h1');
//             title.textContent = movie.title;
//
//             const description = document.createElement('p');
//             movie.description = movie.description.substring(0, 300);
//             description.textContent = movie.description;
//
//             card.appendChild(title);
//             card.appendChild(description);
//
//             container.appendChild(card);
//
//         });
//     }
//     else console.log('error')
// };
// request.send();
//
//
//
// let v = document.createElement('input');
// v.type = "number";
// app.appendChild(v);
//
// let buttonsub = document.createElement('button');
// buttonsub.textContent = "evaluate";
// buttonsub.setAttribute('class', 'btn btn-primary ml-5');
// app.appendChild(buttonsub);
//
// buttonsub.addEventListener("click", () => {
//     // let a = [...v.value.split("")];
//     let redVal=[1];
//     let a = parseInt(v.value);
//     for( let i = a; i >= a; i--) {
//         if(a>1) {
//             if(a % 2 === 0) {
//                 redVal.push(0)
//             } else {
//                 redVal.push(1)
//             }
//
//             a = a%2;
//         }
//         console.log(redVal);
//     }
// });
