const allTrees = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((jon) => displayAllTrees(jon.categories));
};
// Spinner
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("all-card").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("all-card").classList.remove("hidden");
  }
};

// Remove Active
const removeActive = () => {
  const categoriesBtns = document.querySelectorAll(".categoriesBtn");
  categoriesBtns.forEach((btn) => btn.classList.remove("active"));
};

//  Click Button Active
const clickBtn = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickBtn = document.getElementById(`category-btn-${id}`);
      
      clickBtn.classList.add("active");
      displayCategories(json.plants);
    });
};

// lodeTreeDetail Card Details
const lodeTreeDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.plants);
};
// Display Card Details
const displayDetails = (detail) => {
  // console.log(detail)
  const detailsBox = document.getElementById("detail-container");
  detailsBox.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
        <div class="bg-white p-4 rounded-lg">
          <h1 class="text-2xl font-bold mb-2">${detail.name}</h1>
                 <div>
                    <img src="${detail.image}" class="rounded-lg h-[260px] w-[400px] object-cover mx-auto" alt="">
                 </div>
                 <h1 class="border-none text-[#15803D] font-semibold mt-2"><span class="text-xl font-bold text-black">Category : </span>${detail.category}</h1>
                 <p class="text-xl mt-2"><span class="text-xl font-bold">Price :</span>৳ ${detail.price}</p>
                 <div class="space-y-2 mt-2">
                    <p><span class="text-xl font-bold">Description : </span>${detail.description}</p>
                 </div>
            </div>
        `;
  detailsBox.appendChild(div);

  document.getElementById("my_modal_5").showModal();
};

// Click ALl Categories Card 1 by 1
const displayCategories = (plants) => {
  const plantsCard = document.getElementById("allCards");
  plantsCard.innerHTML = "";
  plants.forEach((plant) => {
   
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-white p-4 rounded-lg">
                 <div>
                    <img src="${plant.image}" class="rounded-lg h-[168px] w-[350px] object-cover mx-auto" alt="">
                 </div>
                 <div class="space-y-2 mt-2">
                 <button class="text-xl font-bold" onclick="lodeTreeDetail(${plant.id})">${plant.name}</button>
                    
                    <p class="opacity-70 line-clamp-2">${plant.description}</p>
                 </div>
                 <div class="flex justify-between items-center py-2">
                    <button class="btn border-none bg-[#DCFCE7] text-[#15803D] font-semibold rounded-3xl">
          
                     ${plant.category}
                   </button>
                   <p class="font-bold">৳ <span>${plant.price}</span></p>
                 </div>
                 <button onclick="lodePrice('${plant.name}', ${plant.price})" class="btn bg-[#15803D] text-white rounded-3xl w-full">Add to Cart</button>
            </div>
        `;
    plantsCard.appendChild(div);
  });
  manageSpinner(false);
};


const displayAllTrees = (trees) => {
  const treesCard = document.getElementById("categotis");
  treesCard.innerHTML = "";
  trees.forEach((tree) => {
   
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="category-btn-${tree.id}" onclick="clickBtn(${tree.id})" class="text-left p-2 font-semibold w-full rounded-sm hover:bg-[#85ffb6] categoriesBtn">${tree.category_name}</button>
        `;
    treesCard.appendChild(div);
  });
};
allTrees();

// ALlCards
const allCards = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => displayAllCards(json.plants));
};
// AllCards Full
const displayAllCards = (plants) => {
  const plantsCard = document.getElementById("allCards");
  plantsCard.innerHTML = "";
  plants.forEach((plant) => {
    
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-white p-4 rounded-lg">
                 <div>
                    <img src="${plant.image}" class="rounded-lg h-[168px] w-[350px] object-cover mx-auto" alt="">
                 </div>
                 <div class="space-y-2 mt-2">
                 <button class="text-xl font-bold" onclick="lodeTreeDetail(${plant.id})">${plant.name}</button>
                    
                    <p class="opacity-70 line-clamp-2">${plant.description}</p>
                 </div>
                 <div class="flex justify-between items-center py-2">
                   
                 
                  <button  class="btn border-none bg-[#DCFCE7] text-[#15803D] font-semibold rounded-3xl">
          
                    ${plant.category}
                  </button>
                 <p class="font-bold">৳ <span>${plant.price}</span></p>
                 </div>
                 <button onclick="lodePrice('${plant.name}', ${plant.price})" class="btn bg-[#15803D] text-white rounded-3xl w-full">Add to Cart</button>
            </div>
        `;
    plantsCard.appendChild(div);
  });
  manageSpinner(false);
};
const allTreesBtn = () => {
  removeActive();
  allCards();
  const categoriesBtn = document.getElementById("categoriesBtn");
  categoriesBtn.classList.add("active");
};

// TOTAL CALCULATE PRICE
let total = 0;
const lodePrice = (name, price) => {
  const yourCard = document.getElementById("yourCard");
  const spanTotal = document.getElementById("spnTotal");
  const div = document.createElement("div");
  alert("Add To Cart");
  div.innerHTML = `
    <div
              class="flex justify-between items-center bg-[#DCFCE7] p-2 rounded-lg">
            
              <div class="space-y-3">
                <h2 class="font-bold">${name}</h2>
                <p class="opacity-70">৳ <span id="itemPrice"> ${price}</span> × 1</p>
              </div>
              <div class="opacity-70 text-red-500">
                <i class="fa-solid fa-xmark"></i>
              </div>
            </div>
    `;
  // TOTAL ADD PRICE


  total += price;
  spanTotal.innerText = total;
  div.querySelector("i").addEventListener("click", function () {
    div.remove();
   
    total -= price;
    spanTotal.innerText = total;
  });
  yourCard.appendChild(div);

};

allCards();
