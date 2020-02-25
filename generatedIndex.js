const ul = document.getElementById("output");

function loadData() {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', '\n' +
        './generated.json', true);

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
        let available = ele[captions[4]] === 'Available';

        const li = document.createElement("li");
        li.classList.add("list-item","card");
        const title = document.createElement("div");
        title.classList.add("name","card-header");
        const idValue = document.createElement("div");
        idValue.classList.add("sport","card-title");
        const color = document.createElement("div");
        color.classList.add("age");
        const price = document.createElement("div");
        price.classList.add("country");
        const availability = document.createElement("div");
        availability.classList.add("year");

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
        // cardBody.appendChild(availability);
        li.appendChild(cardBody);

        //Add button
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer', 'text-center');
        const addButton = document.createElement('button');
        addButton.classList.add('add-btn', 'btn', 'btn-primary');
        const addIcon = document.createElement('span');
        if(!available) {
            addButton.style.display = 'none';
        }

        addIcon.innerText = "+";
        addIcon.classList.add('add-icon');
        addButton.appendChild(addIcon);
        cardFooter.appendChild(addButton);
        li.appendChild(cardFooter);
        //Send to the html
        ul.appendChild(li);

    });
}

