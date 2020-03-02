const ul = document.getElementById("output");
const sidebarPanel = document.getElementById("sidebar");
const emptyCartLabel = document.getElementById("empty-cart");
const cartListClose = document.getElementById("closeSidebar");
const cartListOpen = document.getElementById("openSidebar");
const arr = [];
import './styles.scss';

let value = 0;

(function loadData() {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', '\n' +
        './localData.json', true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            getData(xhr.responseText);
        }
    };
    xhr.send();
})();
function getData(data) {

    let dataArr = JSON.parse(data)[0].products,
        captions = Object.keys(dataArr[0]),
        disabled = true;

    dataArr.forEach((ele, index) => {
        arr.push(ele);
        let available = ele[captions[4]] === 'Available';

        const li = document.createElement("li");
        li.classList.add("col-xs-2", "col-sm-4", "col-md-3", "col-lg-3", "text-center");
        const cardContent = document.createElement("div");
        cardContent.classList.add("card", "card-content");
        const title = document.createElement("div");
        title.classList.add("name","card-header");
        const idValue = document.createElement("div");
        idValue.classList.add("idVal");
        const color = document.createElement("div");
        color.classList.add("color");
        const price = document.createElement("div");
        price.classList.add("price");
        const availability = document.createElement("span");
        availability.classList.add("availability");
        const picture = document.createElement("img");
        picture.classList.add("picture","card-img-top");

        title.textContent = ele[captions[0]];
        idValue.textContent = ele[captions[1]];
        color.textContent = ele[captions[2]];
        price.textContent = ele[captions[3]];
        availability.textContent = ele[captions[4]];
        picture.src = "";
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        cardContent.appendChild(title);
        cardBody.appendChild(idValue);
        cardBody.appendChild(color);
        cardBody.appendChild(price);
        cardContent.appendChild(picture);
        cardContent.appendChild(cardBody);

        //Add button
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer', 'text-center');
        if(ele[captions[4]] !== 'Available')
            cardFooter.appendChild(availability);
        const addButton = document.createElement('button');
        addButton.classList.add('add-btn', 'btn', 'btn-primary');


        const countBtnGrp = document.createElement('div');
        countBtnGrp.setAttribute('role', 'group');
        countBtnGrp.classList.add('btn-group');

        const addIcon = document.createElement('span');
        if(!available) {
            addButton.style.display = 'none';
        }

        addButton.innerText = "Add";
        addButton.onclick = function() {
            addToCart(event, ele[captions[1]]).forEach(ele =>
                countBtnGrp.appendChild(ele));
        };

        cardFooter.appendChild(countBtnGrp);
        cardFooter.appendChild(addButton);
        cardContent.appendChild(cardFooter);
        li.appendChild(cardContent);

        //Send to the html
        ul.appendChild(li);

    });
}

function getStepper() {
    //Counter

    const leftBtn = document.createElement('button');
    leftBtn.classList.add('btn', 'btn-secondary', 'btn-left-btn');
    leftBtn.innerText = '-';

    const countLabel = document.createElement('button');
    countLabel.classList.add('btn', 'btn-secondary', 'btn-center-btn');
    countLabel.innerText = 1;

    const rightBtn = document.createElement('button');
    rightBtn.classList.add('btn', 'btn-secondary', 'btn-right-btn');
    rightBtn.innerText = '+';

    return [leftBtn,countLabel,rightBtn];
}

/*Add to cart*/
function addToCart(e, singleId) {
    // let countVal = 1;
    let addedBtn = e.target.classList.contains('add-btn') ? e.target : '',
        disabled = true,
        cartItem = document.createElement('div');
    if(e.target === addedBtn) {
        sidebarPanel.classList.remove('hide');
        arr.forEach((ele, i) => {
            if (ele.id === singleId) {
                const cartItemLabel = document.createElement('label');
                cartItemLabel.innerText = ele.title;
                cartItem.appendChild(cartItemLabel);
                sidebarPanel.appendChild(cartItem);
                addedBtn.innerText = 'Added';
                addedBtn.style.display = 'none';

                const countBtnGrp = document.createElement('div');
                countBtnGrp.setAttribute('role', 'group');
                countBtnGrp.classList.add('btn-group');
                let a = getStepper();
                a.forEach(ele =>
                    countBtnGrp.appendChild(ele)
                );
                cartItem.appendChild(countBtnGrp);
            }
        });
        emptyCartLabel.innerText = '';

        return getStepper();
    }
}

/*Close Cart*/
cartListClose.addEventListener('click', closeSidebar);
function closeSidebar (e) {
    sidebarPanel.classList.toggle('hide');
}

/*Open my order list*/
cartListOpen.addEventListener('click', openSidebar);
function openSidebar (e) {
    sidebarPanel.classList.toggle('hide');
}

/*Add count*/
document.querySelector('body').addEventListener('click', e => {
    if(e.target.classList.contains('btn-left-btn')) {
        value = parseInt(e.target.nextElementSibling.innerText);
        if(value > 0)
            e.target.nextElementSibling.innerText = value - 1;

    } else if (e.target.classList.contains('btn-right-btn'))  {
        let value = parseInt(e.target.previousElementSibling.innerText);
        if(value >= 0)
            e.target.previousElementSibling.innerText = value + 1;
    }
});
