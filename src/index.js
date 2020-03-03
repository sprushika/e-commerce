import './styles.scss';


const ul = document.getElementById("output");
const sidebarPanel = document.getElementById("sidebar");
const emptyCartLabel = document.getElementById("empty-cart");
const cartListClose = document.getElementById("closeSidebar");
const cartListOpen = document.getElementById("openSidebar");
const cartItem = document.createElement('div');
const allData = [],
      myStorage = JSON.parse(localStorage.getItem('myStorage'));
let qt = 0;

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

function createCartListItem(listName, qtVal, isCartList) {
    const cartItemLabel = document.createElement('label');
    cartItemLabel.classList.add('cart-list-item-label');


    const countBtnGrp = document.createElement('div');
    countBtnGrp.setAttribute('role', 'group');
    countBtnGrp.classList.add('btn-group');

    getStepper(qtVal).forEach(ele =>
        countBtnGrp.appendChild(ele)
    );

    cartItemLabel.innerText = listName;
    cartItem.appendChild(cartItemLabel);
    cartItem.appendChild(countBtnGrp);

    sidebarPanel.appendChild(cartItem);

    if(isCartList === 'main-page') {
        const cartItemLabel = document.createElement('label');
        cartItemLabel.classList.add('cart-list-item-label');


        const countBtnGrp = document.createElement('div');
        countBtnGrp.setAttribute('role', 'group');
        countBtnGrp.classList.add('btn-group');

        getStepper(qtVal).forEach(ele =>
            (countBtnGrp.appendChild(ele))
        );
        return countBtnGrp;
    }
}

function getData(data) {

    let dataArr = JSON.parse(data)[0].products,
        captions = Object.keys(dataArr[0]),
        disabled = true,
        lSQuantityVal;

    dataArr.forEach((ele, index) => {
        let available = ele[captions[4]] === 'Available';
        //Get all the data into allData array
        allData.push(ele);

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

        //Add button
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer', 'text-center');
        if(ele[captions[4]] !== 'Available')
            cardFooter.appendChild(availability);
        const addButton = document.createElement('button');
        addButton.classList.add('add-btn', 'btn', 'btn-primary');
        addButton.innerText = "Add";

        if(!available) {
            addButton.style.display = 'none';
        } else if(myStorage !== null) {
            //Add the same items to the cart list
            myStorage.forEach(item => {
                if(ele[captions[1]] === item.id) {

                    //Counter btn group
                    const countBtnGrp = document.createElement('div');
                    countBtnGrp.setAttribute('role', 'group');
                    countBtnGrp.classList.add('btn-group');

                    let getCBG = createCartListItem(ele.title, item.quantity, 'main-page');
                    getCBG.classList.add('card-btn-group');
                    cardFooter.appendChild(getCBG);
                    cardFooter.appendChild(addButton);
                    cardContent.appendChild(cardFooter);
                    li.appendChild(cardContent);

                    //Send to the html
                    ul.appendChild(li);

                    //Don't allow to add those items
                    addButton.innerText = 'Added';
                    addButton.style.display = 'none';

                }
            })
        } else if(available && myStorage === null) {

        }

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

        const countBtnGrp = document.createElement('div');
        countBtnGrp.setAttribute('role', 'group');
        countBtnGrp.classList.add('btn-group');

        addButton.onclick = function() {
            addToCart(event, ele[captions[1]]).forEach(ele =>
                countBtnGrp.appendChild(ele));
        };
        cardFooter.appendChild(countBtnGrp);
        cardFooter.appendChild(addButton);
        cardContent.appendChild(cardFooter);
        li.appendChild(cardContent);
        li.setAttribute('id',ele[captions[1]]);
        //Send to the html
        ul.appendChild(li);

    });
}

function getStepper(qtVal) {
    //Counter

    const leftBtn = document.createElement('button');
    leftBtn.classList.add('btn', 'btn-secondary', 'btn-left-btn');
    leftBtn.innerText = '-';

    const countLabel = document.createElement('button');
    countLabel.classList.add('btn', 'btn-secondary', 'btn-center-btn');
    countLabel.innerText = qtVal;

    const rightBtn = document.createElement('button');
    rightBtn.classList.add('btn', 'btn-secondary', 'btn-right-btn');
    rightBtn.innerText = '+';

    return [leftBtn,countLabel,rightBtn];
}

/*Add to cart*/
function addToCart(e, singleId) {
    let addedBtn = e.target.classList.contains('add-btn') ? e.target : '',
        localObj = {};

    if(e.target === addedBtn) {
        //Show the sidebar panel
        sidebarPanel.classList.remove('hide');

        allData.forEach((ele, i) => {
            if (ele.id === singleId) {

                createCartListItem(ele.title, qtVal);

                addedBtn.innerText = 'Added';
                addedBtn.style.display = 'none';

                localObj = {"id": singleId, "value": ele.title, "quantity": qtVal};

                myStorage.push(localObj);

                /*Local storage*/
                localStorage.setItem('myStorage', JSON.stringify(myStorage));
            }
        });
        emptyCartLabel.innerText = '';

        return getStepper(qtVal);
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
    if(e.target.classList.contains('btn-left-btn','card-btn-group')) {
        qt = parseInt(e.target.nextElementSibling.innerText);
        if(qt > 0) {
            e.target.nextElementSibling.innerText = qt - 1;
        }
        storeToLS(e.target.offsetParent.offsetParent.offsetParent.id, e.target.nextElementSibling.innerText);

    } else if (e.target.classList.contains('btn-right-btn','card-btn-group'))  {
        let qt = parseInt(e.target.previousElementSibling.innerText);
        if(qt >= 0)
            e.target.previousElementSibling.innerText = qt + 1;
        storeToLS( e.target.offsetParent.offsetParent.offsetParent.id, e.target.previousElementSibling.innerText);
    }
    function storeToLS(itemId, q) {
        let allData = JSON.parse(localStorage.getItem('myStorage'));
        allData.forEach(ele => {
            if(itemId && ele.id === itemId) {
                ele.quantity = q;
            }
        });
        localStorage.setItem('myStorage', JSON.stringify(allData));
    }
});
