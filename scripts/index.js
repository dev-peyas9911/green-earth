// Remove Active Button Category
const removeActive = () => {
    const allBtn = document.querySelectorAll('.btn-cat');
    for (let btn of allBtn) {
        btn.classList.remove('active')
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
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => displayPlant(data.plants))
};

// Load Category Data
const loadCategoryData = (id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const btnCategory = document.getElementById(`btn-category-${id}`);
        btnCategory.classList.add('active');
        displayCategoryData(data.plants)
    })
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
                                <h2 class="card-title">${word.name}</h2>
                                <p>${word.description}</p>
                                <div class="flex justify-between items-center">
                                    <span class="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-xl">${word.category}</span>
                                    <span class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${word.price}</span></span>
                                </div>
                                <div class="card-actions">
                                    <button class="btn bg-[#03C755] text-white border-[#00b544] w-full rounded-4xl">Add to
                                        Cart</button>
                                </div>
                            </div>
                        </div>
        `;
        cardContainer.appendChild(card);
    });
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