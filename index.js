const ul = document.getElementById("output");
const sidebarPanel = document.getElementById("sidebar");
const emptyCartLabel = document.getElementById("empty-cart");
const cartListClose = document.getElementById("closeSidebar");
const cartListOpen = document.getElementById("openSidebar");
const arr = [];

function loadData() {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', '\n' +
        './localData.json', true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            getData(xhr.responseText);
        }
    };
    xhr.send();
}
function getData(data) {

    let dataArr = JSON.parse(data)[0].products,
        captions = Object.keys(dataArr[0]),
        disabled = true;

    dataArr.forEach((ele, index) => {
        arr.push(ele);
        let available = ele[captions[4]] === 'Available';

        const li = document.createElement("li");
        li.classList.add("list-item","card");
        const title = document.createElement("div");
        title.classList.add("name","card-header");
        const idValue = document.createElement("div");
        idValue.classList.add("sport","card-title");
        const color = document.createElement("div");
        color.classList.add("color");
        const price = document.createElement("div");
        price.classList.add("price");
        const availability = document.createElement("span");
        availability.classList.add("availability");

        title.textContent = ele[captions[0]];
        idValue.textContent = ele[captions[1]];
        color.textContent = ele[captions[2]];
        price.textContent = ele[captions[3]];
        availability.textContent = ele[captions[4]];

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        li.appendChild(title);
        cardBody.appendChild(idValue);
        cardBody.appendChild(color);
        cardBody.appendChild(price);
        li.appendChild(cardBody);

        //Add button
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer', 'text-center');
        if(ele[captions[4]] !== 'Available')
            cardFooter.appendChild(availability);
        const addButton = document.createElement('button');
        addButton.classList.add('add-btn', 'btn', 'btn-primary');
        const addIcon = document.createElement('span');
        if(!available) {
            addButton.style.display = 'none';
        }

        addButton.innerText = "Add";
        // addButton.appendChild(addIcon);
        addButton.onclick = function() {
          addToCart(event, ele[captions[1]]);
        };
        cardFooter.appendChild(addButton);
        li.appendChild(cardFooter);
        //Send to the html
        ul.appendChild(li);

    });
}
// console.log(arr);
//
function addToCart(e, singleId) {

    let
        // addButton = document.querySelector('.add-btn'),
        addedBtn = e.target.classList.contains('add-btn') ? e.target : '',
        disabled = true,
        cartItem = document.createElement('div');
    if(e.target === addedBtn) {
        sidebarPanel.classList.remove('hide');
        arr.forEach((ele, i) => {
            if (ele.id === singleId) {
                cartItem.innerText = ele.title;
                sidebarPanel.appendChild(cartItem);
                addedBtn.innerText = 'Added';
                addedBtn.setAttribute('disabled', disabled);
            }
            // console.log(ele[[i]] === arr[i[singleId]]);
        });
        emptyCartLabel.innerText = '';
    }
}
cartListClose.addEventListener('click', closeSidebar);

function closeSidebar (e) {
    sidebarPanel.classList.toggle('hide');
}
cartListOpen.addEventListener('click', openSidebar);

function openSidebar (e) {
    sidebarPanel.classList.toggle('hide');
}
