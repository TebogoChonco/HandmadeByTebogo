let shop = document.getElementById("shop");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

// shopItemsData = [];

let shopItemsData = [
  {
    id: "candle1",
    name: "Candle 1",
    price: 100,
    desc: "for 1 mid-sized pillar candle",
    img: "../Images/candle1.jpg",
  },
  {
    id: "candle2",
    name: "Candle 2",
    price: 650,
    desc: "for 1 large-sized pillar candle",
    img: "../Images/candle3.jpg",
  },
  {
    id: "candle3",
    name: "Candle 3",
    price: 35,
    desc: "for 1 dinner candle",
    img: "../Images/candle4.jpg",
  },
  {
    id: "box1",
    name: "Box 1",
    price: 45,
    desc: "Milk carton party pack box",
    img: "../Images/box1.jpg",
  },
  {
    id: "box2",
    name: "Box 2",
    price: 45,
    desc: "Rounded party pack box",
    img: "../Images/box2.jpg",
  },
  {
  id: "box3",
  name: "Box 3",
  price: 45,
  desc: "Heart party pack box",
  img: "../Images/box3.jpg",
 },
  {
    id: "pringles1",
    name: "Pringles 1",
    price: 55,
    desc: "boy-themed chip box",
    img: "../Images/pringles1.jpg",
  },
  {
    id: "pringles",
    name: "Pringles 2",
    price: 55,
    desc: "girl-themed chip box",
    img: "../Images/pringles2.jpg",
  },
  {
    id: "pringles3",
    name: "Pringles 3",
    price: 50,
    desc: "gender neutral-themed chip box",
    img: "../Images/pringles3.jpg",
  },
  {
    id: "tray1",
    name: "Tray 1",
    price: 40,
    desc: "simple tray box box",
    img: "../Images/tray1.jpg",
  },
  {
    id: "tray2",
    name: "Tray 2",
    price: 48,
    desc: "3D tray box box",
    img: "../Images/tray2.jpg",
  },
  {
    id: "tray3",
    name: "Tray 3",
    price: 48,
    desc: "printed 3D tray box box",
    img: "../Images/tray3.jpg",
  },
];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData 
    .map((x) => {
      let { id, name, desc, img, price } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>R ${price} </h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

generateShop();

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
