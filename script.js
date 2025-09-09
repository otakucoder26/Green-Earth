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
      // console.log(clickBtn)
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
