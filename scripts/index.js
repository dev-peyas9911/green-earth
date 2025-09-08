// Remove Active Button Category
const removeActive = () => {
    const allBtn = document.querySelectorAll('.btn-cat');
    for (let btn of allBtn) {
        btn.classList.remove('active')
    }
}

// Spinner
const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
    }
    else {
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('card-container').classList.remove('hidden');
    }
}


// Load Category
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((data) => displayCategory(data.categories))
};

// Load All Plant
const loadPlant = () => {
    manageSpinner(true);
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => {
            displayPlant(data.plants);
            manageSpinner(false);
        })
        .catch(() => manageSpinner(false));
        
};

// Load Category Data
const loadCategoryData = (id) => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const btnCategory = document.getElementById(`btn-category-${id}`);
            btnCategory.classList.add('active');
            displayCategoryData(data.plants);
            manageSpinner(false);
        })
        .catch(() => manageSpinner(false));
};

// Load Category Details (Modal)
const loadCategoryDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then((res) => res.json())
        .then((data) => displayCategoryDetails(data.plants))
};

// ADD Event Listener
let totalPrice = 0;

function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.addToCart');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const price = parseFloat(btn.getAttribute('data-price'));

            // Create cart item row
            const cartItem = document.createElement('div');
            cartItem.classList.add('flex', 'justify-between', 'items-center', 'pb-1', 'bg-white', 'rounded-xl', 'p-[10px]');
            cartItem.innerHTML = `
        <div>
          <h2 class="font-bold">${title}</h2>
          <p>${price} ৳</p>
        </div>
        <div>
          <i class="fa-solid fa-xmark cursor-pointer text-red-500"></i>
        </div>
      `;

            // Add to cart container
            document.getElementById('cart-item-container').appendChild(cartItem);

            // Update total
            totalPrice += price;
            document.getElementById('total-price').textContent = totalPrice;

            // Remove item on ❌ click
            cartItem.querySelector('i').addEventListener('click', () => {
                cartItem.remove();
                totalPrice -= price;
                document.getElementById('total-price').textContent = totalPrice;
            });
        });
    });
}




// Display Category Details (Modal)
const displayCategoryDetails = (words) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <h2 class="font-bold">${words.name}</h2>
    <figure class="px-3 pt-3 ">
      <img class="h-[180px] w-full object-cover rounded-xl" src="${words.image}"
                                    alt="Shoes" />
    </figure>
    <p><span class="font-bold">Category:</span> ${words.category}</p>
    <p><span class="font-semibold">Price:</span> <i class="fa-solid fa-bangladeshi-taka-sign"></i>${words.price}</p>
    <p><span class="font-semibold">Description:</span> ${words.description}</p>
    `
    document.getElementById('my_modal_5').showModal();
};

// Display Category Data
const displayCategoryData = (words) => {
    displayPlant(words);
};


// Display All Plant
function displayPlant(words) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    words.forEach((word) => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card bg-base-100 max-w-[280px] h-full shadow-sm">
                            <figure class="px-3 pt-3 ">
                                <img class="h-[180px] w-full object-cover rounded-xl" src="${word.image}"
                                    alt="Shoes" />
                            </figure>
                            <div class="card-body">
                                <h2 onclick="loadCategoryDetails(${word.id})" class="card-title">${word.name}</h2>
                                <p>${word.description}</p>
                                <div class="flex justify-between items-center">
                                    <span class="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-xl">${word.category}</span>
                                    <span class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${word.price}</span></span>
                                </div>
                                <div class="card-actions">
                                    <button id="${word.id}" data-title="${word.name}" 
  data-price="${word.price}" class="addToCart btn bg-[#03C755] text-white border-[#00b544] w-full rounded-4xl">Add to
                                        Cart</button>
                                </div>
                            </div>
                        </div>
        `;
        cardContainer.appendChild(card);
    });
    setupAddToCartButtons();
}

// Display Category
const displayCategory = (words) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';
    for (const word of words) {
        const div = document.createElement('div');
        div.innerHTML = `<button id="btn-category-${word.id}" onclick="loadCategoryData(${word.id})" class="btn btn-outline btn-success w-full border-none btn-cat">${word.category_name}</button>`;
        categoryContainer.appendChild(div);
    }
};



// Calling Load All Plant function
loadPlant();

// Calling Load Category Function
loadCategory();