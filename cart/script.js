var cartArr = JSON.parse(localStorage.getItem("arrCart"));

//-----------------------------------------------------------------------------------------------
//Cart List
function cartList() {
  document.getElementById("items-list").innerHTML = "";
  let innerHtml = "";
  cartArr.forEach((cart) => {
    const sizes = ["S", "M", "L", "XL"];
    const randomSize = Math.floor(Math.random() * sizes.length);

    const colors = ["red", "blue", "blueviolet", "black"];
    const randomColor = Math.floor(Math.random() * sizes.length);

    innerHtml += `
                <div class="card">
                <img src="${cart.image}"/>
                <div class="title"><strong>${
                  cart.title.length > 10
                    ? cart.title.substring(0, 10).concat(" ...more")
                    : cart.title
                }</strong></div>
                <div class="price">₹${cart.price}</div>
                <div class="rating">Rating: ${cart.rating.rate}⭐</div>
                <div class="size size-${sizes[randomSize]}">${
      sizes[randomSize]
    }</div>
            
                <button class="delete buttons" id="btn-${
                  cart.id
                }" onClick=deleteItem(${cart.id})>Remove Item</button>
                </div>
                  `;
  });
  document.getElementById("items-list").innerHTML = innerHtml;
}

cartList();

//----------------------------------------------------------------------------------------------
//price list
var cost = 0;

function priceList() {
  document.getElementById("price-list").innerHTML = "";
  let innerHtml = `<div id="check-list">Checkout List</div>`;
  cartArr.forEach((cart) => {
    console.log(cart);
    innerHtml += `
                <ul>
                <li class="li-class">
                <div class="chk-lst-item"> ➢ ${
                  cart.title.length > 20
                    ? cart.title.substring(0, 20).concat(" ...more")
                    : cart.title
                }</div><div class="chk-lst-item prce">₹${cart.price}</div>
                </li>
                </ul>
                
                  `;
    cost += cart.price;
  });
  innerHtml += `<hr>
                <ul>
                    <li class="li-class">
                        <div class="chk-lst-item">Total</div><div class="chk-lst-item prce" id="total-cost">₹${Math.floor(
                          cost
                        )}</div>
                    </li>
                </ul>
                <hr>
                <button id="checkout-btn" >Checkout</button>
                    `;
  document.getElementById("price-list").innerHTML = innerHtml;
}

priceList();

function deleteItem(id) {
  const itemToDelete = cartArr.find((item) => item.id === id);
  const itemIndex = cartArr.indexOf(itemToDelete);
  if (itemIndex > -1) {
    cartArr.splice(itemIndex, 1);
  }
  localStorage.setItem("arrCart", JSON.stringify(cartArr));
  location.reload();
  cartList();
  cost = 0;
  priceList();
}
document.getElementById("checkout-btn").onclick = function (e) {
  var options = {
    key: "rzp_test_WgvIO199GLc82P",
    amount: `${cost}` * 100,
    currency: "INR",
    name: "MeShop Payment Gateway",
    description: "This is your order",
    theme: {
      color: "#0D94FB",
    },
    image:
      "./All-seeing-eye-1652136_960_720.png",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();

  clearCart();
  e.preventDefault();
};

function clearCart() {
  document.getElementById("items-list").innerHTML = "";
  document.getElementById("price-list").style.display = "none";
  localStorage.removeItem("arrCart");

  document.getElementById("items-list").innerHTML += `

  <div class="greetMsg">
   <p class="greet"> 🙏 Thank you for shopping with us</p>
  <br/>
  <p>Please have a look for another product....🛍️</p>
  </div>
  `;
}