const container = document.querySelector(".items");
const container2 = document.querySelector(".filter-res");
const menProducts = document.querySelector(".item-1");
const womenProducts = document.querySelector(".item-2");
const jewelryProducts = document.querySelector(".item-3");
const electronicsProducts = document.querySelector(".item-4");
let searchInput = document.querySelector("#search-input");
let range = document.querySelector("#ratingRange");

let arrProducts = [];
let arrCart = [];

fetch("https://fakestoreapi.com/products")
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    arrProducts = data;

    let menElements = arrProducts.filter(
      (product) => product.category === "men's clothing"
    );
    let womenElements = arrProducts.filter(
      (product) => product.category === "women's clothing"
    );
    let jewelryElements = arrProducts.filter(
      (product) => product.category === "jewelery"
    );
    let electronicsElements = arrProducts.filter(
      (product) => product.category === "electronics"
    );
    showItems(menElements, menProducts);
    showItems(womenElements, womenProducts);
    showItems(jewelryElements, jewelryProducts);
    showItems(electronicsElements, electronicsProducts);
  })
  .catch((error) => {
    console.error(error);
  });

function showItems(arrProducts, productsContainer) {
  productsContainer.innerHTML = "";
  arrProducts.forEach((element) => {
    let sizes = randomSize();
    let colours = randomColour();

    element["sizes"] = sizes;
    element["colours"] = colours;
    productsContainer.innerHTML += `
      <div class="item">
        <img src="${element.image}" alt="Item" />
        <div class="info">
          <div class="title">${
            element.title
          }</div>
          <div class="price-size">
            <div class="price">
              <h4>₹ ${element.price}</h4>
            </div>
            <div class="sizes">
              <h4>${element.sizes[0]}, ${element.sizes[1]}, ${
      element.sizes[2]
    }</h4>
            </div>
          </div>
          <div class="colors">
            <h4>Colors:</h4>
            <div class="circles">
              <div class="circle" style="background-color: ${
                element.colours[0]
              }"></div>
              <div class="circle" style="background-color: ${
                element.colours[1]
              }"></div>
              <div class="circle" style="background-color: ${
                element.colours[2]
              }"></div>
            </div>
          </div>
          <div class="rating">Rating: ${Math.floor(element.rating.rate)}⭐</div>
        </div>
        <button id="addBtn" onClick='addToCart(${
          element.id
        })'>Add to Cart</button>
      </div>
    `;
  });
  localStorage.setItem("arrProduct", JSON.stringify(arrProducts));
  searchInput.addEventListener("input", () => {
    let myArr = arrProducts.filter((element) => {
      if (
        element.title
          .toLowerCase()
          .includes(searchInput.value.trim().toLowerCase())
      ) {
        return element;
      }
    });
    if (myArr.length == 0) {
      productsContainer.innerHTML = `
        <p>It looks like, nothing was found at this stage... Maybe try a search ?</P>
      `;
      return;
    }
    showItems(myArr, productsContainer);
  });
}

function randomSize() {
  let res = [];
  let s = ["S", "M", "L", "XL", "XXL"];
  let i = 0,
    j = 0;
  k = 0;
  while (i == j || j == k || k == i) {
    i = Math.floor(Math.random() * s.length);
    j = Math.floor(Math.random() * s.length);
    k = Math.floor(Math.random() * s.length);
  }
  res.push(s[i]);
  res.push(s[j]);
  res.push(s[k]);
  return res;
}

function randomColour() {
  let res = [];
  let s = ["red", "blue", "green", "gray", "pink"];
  let i = 0,
    j = 0;
  k = 0;
  while (i == j || j == k || k == i) {
    i = Math.floor(Math.random() * s.length);
    j = Math.floor(Math.random() * s.length);
    k = Math.floor(Math.random() * s.length);
  }
  res.push(s[i]);
  res.push(s[j]);
  res.push(s[k]);
  return res;
}

// filtering on button clicks -------------------------------------------------------------------
const allBtn = document.getElementById("allFilter");
const mensBtn = document.getElementById("mensFilter");
const womensBtn = document.getElementById("womensFilter");
const jwelleryBtn = document.getElementById("jwelleryFilter");
const electronicsBtn = document.getElementById("electronicsFilter");

allBtn.addEventListener("click", () => {
  location.reload();
  document.querySelector(".item-1").style.display = "flex";
  document.querySelector(".mens-section").style.display = "block";
  document.querySelector(".womens-section").style.display = "block";
  document.querySelector(".jwellery-section").style.display = "block";
  document.querySelector(".electronics-section").style.display = "block";

  document.querySelector("#allFilter").style.backgroundColor = "black";
  document.querySelector("#allFilter").style.color = "white";
  document.querySelector("#mensFilter").style.backgroundColor = "white";
  document.querySelector("#mensFilter").style.color = "black";
  document.querySelector("#womensFilter").style.backgroundColor = "white";
  document.querySelector("#womensFilter").style.color = "black";
  document.querySelector("#jwelleryFilter").style.backgroundColor = "white";
  document.querySelector("#jwelleryFilter").style.color = "black";
  document.querySelector("#electronicsFilter").style.backgroundColor = "white";
  document.querySelector("#electronicsFilter").style.color = "black";
});

mensBtn.addEventListener("click", () => {
  document.querySelector(".mens-section").style.display = "block";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";

  document.querySelector("#allFilter").style.backgroundColor = "white";
  document.querySelector("#allFilter").style.color = "black";
  document.querySelector("#mensFilter").style.backgroundColor = "black";
  document.querySelector("#mensFilter").style.color = "white";
  document.querySelector("#womensFilter").style.backgroundColor = "white";
  document.querySelector("#womensFilter").style.color = "black";
  document.querySelector("#jwelleryFilter").style.backgroundColor = "white";
  document.querySelector("#jwelleryFilter").style.color = "black";
  document.querySelector("#electronicsFilter").style.backgroundColor = "white";
  document.querySelector("#electronicsFilter").style.color = "black";
});

womensBtn.addEventListener("click", () => {
  document.querySelector(".womens-section").style.display = "block";
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";

  document.querySelector("#allFilter").style.backgroundColor = "white";
  document.querySelector("#allFilter").style.color = "black";
  document.querySelector("#mensFilter").style.backgroundColor = "white";
  document.querySelector("#mensFilter").style.color = "black";
  document.querySelector("#womensFilter").style.backgroundColor = "black";
  document.querySelector("#womensFilter").style.color = "white";
  document.querySelector("#jwelleryFilter").style.backgroundColor = "white";
  document.querySelector("#jwelleryFilter").style.color = "black";
  document.querySelector("#electronicsFilter").style.backgroundColor = "white";
  document.querySelector("#electronicsFilter").style.color = "black";
});

jwelleryBtn.addEventListener("click", () => {
  document.querySelector(".jwellery-section").style.display = "block";
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";

  document.querySelector("#allFilter").style.backgroundColor = "white";
  document.querySelector("#allFilter").style.color = "black";
  document.querySelector("#mensFilter").style.backgroundColor = "white";
  document.querySelector("#mensFilter").style.color = "black";
  document.querySelector("#womensFilter").style.backgroundColor = "white";
  document.querySelector("#womensFilter").style.color = "black";
  document.querySelector("#jwelleryFilter").style.backgroundColor = "black";
  document.querySelector("#jwelleryFilter").style.color = "white";
  document.querySelector("#electronicsFilter").style.backgroundColor = "white";
  document.querySelector("#electronicsFilter").style.color = "black";
});

electronicsBtn.addEventListener("click", () => {
  document.querySelector(".electronics-section").style.display = "block";
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";

  document.querySelector("#allFilter").style.backgroundColor = "white";
  document.querySelector("#allFilter").style.color = "black";
  document.querySelector("#mensFilter").style.backgroundColor = "white";
  document.querySelector("#mensFilter").style.color = "black";
  document.querySelector("#womensFilter").style.backgroundColor = "white";
  document.querySelector("#womensFilter").style.color = "black";
  document.querySelector("#jwelleryFilter").style.backgroundColor = "white";
  document.querySelector("#jwelleryFilter").style.color = "black";
  document.querySelector("#electronicsFilter").style.backgroundColor = "black";
  document.querySelector("#electronicsFilter").style.color = "white";
});
//-----------------------------------------------------------------------------------------------

/* side bar filters */

/*according to size-----------------------------------------------------------------------------*/
let products = JSON.parse(localStorage.getItem("arrProduct"));
console.log("ARR", products);

setTimeout(() => {}, 1000);
var red = document.getElementById("red");
red.addEventListener("change", () => {
  if (red.checked) {
    blue.checked = false;
    green.checked = false;
    black.checked = false;
    white.checked = false;
    var newArr = products.filter((item) => {
      for (let i = 0; i < products.length; i++) {
        const currEle = products[i];
        if (currEle.colours.includes("red")) {
          return currEle;
        } else {
          return arrProducts;
        }
      }
    });
  }
  showItems(newArr, container2);
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";
});

var blue = document.getElementById("blue");
blue.addEventListener("change", () => {
  if (blue.checked) {
    red.checked = false;
    green.checked = false;
    black.checked = false;
    white.checked = false;
    var newArr = products.filter((item) => {
      for (let i = 0; i < products.length; i++) {
        const currEle = products[i];
        if (currEle.colours.includes("blue")) {
          return currEle;
        } else {
          return arrProducts;
        }
      }
    });
  }
  showItems(newArr, container2);
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";
});

var green = document.getElementById("green");
green.addEventListener("change", () => {
  if (green.checked) {
    red.checked = false;
    blue.checked = false;
    black.checked = false;
    white.checked = false;
    var newArr = products.filter((item) => {
      for (let i = 0; i < products.length; i++) {
        const currEle = products[i];
        if (currEle.colours.includes("green")) {
          return currEle;
        } else {
          return arrProducts;
        }
      }
    });
  }
  showItems(newArr, container2);
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";
});

var black = document.getElementById("black");
black.addEventListener("change", () => {
  if (black.checked) {
    red.checked = false;
    blue.checked = false;
    green.checked = false;
    white.checked = false;
    var newArr = products.filter((item) => {
      for (let i = 0; i < products.length; i++) {
        const currEle = products[i];
        if (currEle.colours.includes("black")) {
          return currEle;
        } else {
          return arrProducts;
        }
      }
    });
  }
  showItems(newArr, container2);
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";
});

var white = document.getElementById("white");
white.addEventListener("change", () => {
  if (white.checked) {
    red.checked = false;
    blue.checked = false;
    green.checked = false;
    black.checked = false;
    var newArr = products.filter((item) => {
      for (let i = 0; i < products.length; i++) {
        const currEle = products[i];
        if (currEle.colours.includes("white")) {
          return currEle;
        } else {
          return arrProducts;
        }
      }
    });
  }
  showItems(newArr, container2);
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";
});
/*-----------------------------------------------------------------------------------------------*/

/*according to size -----------------------------------------------------------------------------*/
var small = document.getElementById("s");
small.addEventListener("change", () => {
  if (small.checked) {
    medium.checked = false;
    large.checked = false;
    xlarge.checked = false;
    var newArr = products.filter((item) => {
      for (let i = 0; i < products.length; i++) {
        const currEle = products[i];
        if (currEle.sizes.includes("S")) {
          return currEle;
        } else {
          return arrProducts;
        }
      }
    });
  }
  showItems(newArr, container2);
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";
});

var medium = document.getElementById("m");
medium.addEventListener("change", () => {
  if (medium.checked) {
    small.checked = false;
    large.checked = false;
    xlarge.checked = false;
    var newArr = products.filter((item) => {
      for (let i = 0; i < products.length; i++) {
        const currEle = products[i];
        if (currEle.sizes.includes("M")) {
          return currEle;
        } else {
          return arrProducts;
        }
      }
    });
  }
  showItems(newArr, container2);
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";
});

var large = document.getElementById("l");
large.addEventListener("change", () => {
  if (large.checked) {
    medium.checked = false;
    small.checked = false;
    xlarge.checked = false;
    var newArr = products.filter((item) => {
      for (let i = 0; i < products.length; i++) {
        const currEle = products[i];
        if (currEle.sizes.includes("L")) {
          return currEle;
        } else {
          return arrProducts;
        }
      }
    });
  }
  showItems(newArr, container2);
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";
});

var xlarge = document.getElementById("xl");
xlarge.addEventListener("change", () => {
  if (xlarge.checked) {
    medium.checked = false;
    large.checked = false;
    small.checked = false;
    var newArr = products.filter((item) => {
      for (let i = 0; i < products.length; i++) {
        const currEle = products[i];
        if (currEle.sizes.includes("XL")) {
          return currEle;
        } else {
          return arrProducts;
        }
      }
    });
  }
  showItems(newArr, container2);
  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";
});
/*-----------------------------------------------------------------------------------------------*/

/* according to rating---------------------------------------------------------------------------*/
range.addEventListener("input", () => {
  let filteredProducts = arrProducts.filter((product) => {
    if (Math.floor(product.rating.rate) == range.value) {
      return product;
    }
  });

  showItems(filteredProducts, container2);

  document.querySelector(".mens-section").style.display = "none";
  document.querySelector(".womens-section").style.display = "none";
  document.querySelector(".jwellery-section").style.display = "none";
  document.querySelector(".electronics-section").style.display = "none";

  if (filteredProducts.length == 0) {
    container2.innerHTML = `
   <p class="filterMsg"> 😔 No result found : try another combination !!
    `;
    setTimeout(() => {
      location.reload();
    }, 1500);
    return;
  }
});
/*-----------------------------------------------------------------------------------------------*/

/* according to price----------------------------------------------------------------------------*/
/*for first category {0-25} */
var price1 = document.getElementById("0-25");
price1.addEventListener("change", () => {
  if (price1.checked) {
    price2.checked = false;
    price3.checked = false;
    price4.checked = false;

    var newArr = arrProducts.filter((item) => {
      if (item.price >= 0 && item.price <= 25) {
        return item;
      }
    });
    showItems(newArr, container2);
    document.querySelector(".mens-section").style.display = "none";
    document.querySelector(".womens-section").style.display = "none";
    document.querySelector(".jwellery-section").style.display = "none";
    document.querySelector(".electronics-section").style.display = "none";
  }
});

/* for second category{25-50} */
var price2 = document.getElementById("25-50");
price2.addEventListener("change", () => {
  if (price2.checked) {
    price1.checked = false;
    price3.checked = false;
    price4.checked = false;

    var newArr = arrProducts.filter((item) => {
      if (item.price >= 25 && item.price <= 50) {
        return item;
      }
    });
    showItems(newArr, container2);
    document.querySelector(".mens-section").style.display = "none";
    document.querySelector(".womens-section").style.display = "none";
    document.querySelector(".jwellery-section").style.display = "none";
    document.querySelector(".electronics-section").style.display = "none";
  }
});

/* for third category{50-100} */
var price3 = document.getElementById("50-100");
price3.addEventListener("change", () => {
  if (price3.checked) {
    price1.checked = false;
    price2.checked = false;
    price4.checked = false;

    var newArr = arrProducts.filter((item) => {
      if (item.price >= 50 && item.price <= 100) {
        return item;
      }
    });
    showItems(newArr, container2);
    document.querySelector(".mens-section").style.display = "none";
    document.querySelector(".womens-section").style.display = "none";
    document.querySelector(".jwellery-section").style.display = "none";
    document.querySelector(".electronics-section").style.display = "none";
  }
});

/* for fourth category{100+} */
var price4 = document.getElementById("100on");
price4.addEventListener("change", () => {
  if (price4.checked) {
    price1.checked = false;
    price2.checked = false;
    price3.checked = false;

    var newArr = arrProducts.filter((item) => {
      if (item.price > 100) {
        return item;
      }
    });
    showItems(newArr, container2);
    document.querySelector(".mens-section").style.display = "none";
    document.querySelector(".womens-section").style.display = "none";
    document.querySelector(".jwellery-section").style.display = "none";
    document.querySelector(".electronics-section").style.display = "none";
  }
});
/*---------------------------------------------------------------------------------------------------*/

function addToCart(num) {
  var cartItem = {};
  arrProducts.forEach((product) => {
    if (product.id == num) {
      cartItem = product;
    }
  });

  arrCart.push(cartItem);

  alert("Item Added to your cart");
  localStorage.setItem("arrCart", JSON.stringify(arrCart));
}

/* another method to search { add on line no 30}
const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", function () {
      const searchedValue = searchInput.value.toLowerCase();

      menElements = arrProducts.filter(
        (product) =>
          product.category === "men's clothing" &&
          product.title.toLowerCase().includes(searchedValue)
      );
      womenElements = arrProducts.filter(
        (product) =>
          product.category === "women's clothing" &&
          product.title.toLowerCase().includes(searchedValue)
      );
      jewelryElements = arrProducts.filter(
        (product) =>
          product.category === "jewelery" &&
          product.title.toLowerCase().includes(searchedValue)
      );
      electronicsElements = arrProducts.filter(
        (product) =>
          product.category === "electronics" &&
          product.title.toLowerCase().includes(searchedValue)
      );

      showItems(menElements, menProducts);
      showItems(womenElements, womenProducts);
      showItems(jewelryElements, jewelryProducts);
      showItems(electronicsElements, electronicsProducts);
    });
*/