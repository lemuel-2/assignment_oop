class Product {
  #name;
  #price;
  #stock;

  constructor(name, price, stock) {
    this.#name = name;
    this.#price = price;
    this.#stock = stock;
  }

  // the subtract the quantity of the stock
  reduceStock(quantity) {
    // check value if integer or Number
    if (!Number.isInteger(quantity)) return false;

    // check if the quantiry is not less than zero
    if (quantity <= 0) return false;

    // check if the stock have available quantity
    if (quantity > this.#stock) return false;

    // available stock
    this.#stock -= quantity;

    return true;
  }

  // display the information of the product
  productInfo() {
    return {
      name: this.#name,
      price: this.#price,
      stock: this.#stock,
    };
  }

  getName() {
    return this.#name;
  }

  getPrice() {
    return this.#price;
  }

  getStock() {
    return this.#stock;
  }
}

class ShoppingCart {
  #customerName;
  #items;

  constructor(customerName = "customer") {
    this.#customerName = customerName;
    this.#items = [];
  }

  // add Item to items(Chart)
  // return if succesfull or not
  addItem(product, quantity) {
    if (!product.reduceStock(quantity))
      return `Unable to add item: ${product.getName()}`; // if false return unable to add

    this.#items.push({
      product: product,
      quantity: quantity,
    });

    return `Item: ${product.getName()} added successfully`;
  }

  // show customer name
  // show every list of item in the cart
  // show the quantity of item and subtotal amount of the item
  // show the total cost of the cart
  displayCart() {
    console.log(`Customer Name: ${this.#customerName}\n`);
    this.#showListOfProductInfo();
    console.log(`Total: ${this.calculateTotal()}`);
  }

  // calculate the total
  calculateTotal() {
    // Return if no item found
    if (this.#items.length === 0) return 0;

    let total = 0;
    for (const item of this.#items)
      total += item.product.getPrice() * item.quantity; // loop for every item in the list

    return total;
  }

  // show the List product information
  #showListOfProductInfo() {
    if (this.#items.length === 0) {
      console.log("No item found")
      return
    };

    for (let i = 0; i < this.#items.length; i++) {
      const item = this.#items[i];

      console.log(`Item ${i + 1}`);
      this.#showProductInfo(item);
    }
  }

  // show one product information
  #showProductInfo(item) {
    console.log(`Name: ${item.product.getName()}`);
    console.log(`Price: ${item.product.getPrice()}`);
    console.log(`Quantity: ${item.quantity}`);
    console.log(`Subtotal: ${item.product.getPrice() * item.quantity}\n`);
  }
}

function main() {
  // list of the Product
  const product1 = new Product("Laptop", 45_000, 10);
  const product2 = new Product("Mouse", 700, 120);
  const product3 = new Product("ram", 21_000, 15);
  const product4 = new Product("monitor", 21_000, 1);

  // 1st customer
  const customer1 = new ShoppingCart("Lemuel");

  // add item to customer1 cart
  console.log(customer1.addItem(product1, 2));
  console.log(customer1.addItem(product2, 3));
  console.log(customer1.addItem(product3, 2));
  console.log(customer1.addItem(product4, 4));

  console.log();

  // show the available stock
  console.log("Available stock:");
  console.log(`${product1.getName()}: ${product1.getStock()}`);
  console.log(`${product2.getName()}: ${product2.getStock()}`);
  console.log(`${product3.getName()}: ${product3.getStock()}`);
  console.log(`${product4.getName()}: ${product4.getStock()}`);

  console.log();
  customer1.displayCart();

  // ===
  console.log("================");

  // 2nd customer
  console.log();
  const customer2 = new ShoppingCart("Jomar");

  // add item to customer2 cart
  console.log(customer2.addItem(product1, 4));
  console.log(customer2.addItem(product2, 3));
  console.log(customer2.addItem(product3, 2));
  console.log(customer2.addItem(product4, 1));

  console.log();

  // show the available stock after the add to cart
  console.log("Available stock:");
  console.log(`${product1.getName()}: ${product1.getStock()}`);
  console.log(`${product2.getName()}: ${product2.getStock()}`);
  console.log(`${product3.getName()}: ${product3.getStock()}`);
  console.log(`${product4.getName()}: ${product4.getStock()}`);

  console.log();
  customer2.displayCart();

  // ===
  console.log("================");

  console.log();
  // customer3
  const customer3 = new ShoppingCart("Jerome");
  customer3.displayCart();
}

main();
