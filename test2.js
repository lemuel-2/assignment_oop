class Product {
  #name;
  #price;
  #stock;

  constructor(name, price, stock) {
    this.#name = name;
    this.#price = price;
    this.#stock = stock;
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

  reduceStock(quantity) {
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
}

class ShoppingCart {
  #customerName;
  #items;

  constructor(customerName) {
    this.#customerName = customerName;
    this.#items = [];
  }

  // add Item to items(Chart)
  addItem(product, quantity) {
    if (!product.reduceStock(quantity))
      return `Unable to add item: ${product.getName()}`; // if false return unable to add

    this.#items.push({
      product: product,
      quantity: quantity,
    });

    return `Item: ${product.getName()} added successfully`;
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

  // show the product info
  showProductInfo() {
    if (this.#items.length === 0) return "No item found";

    for (let i = 0; i < this.#items.length; i++) {
      const item = this.#items[i];

      console.log(`Item ${i + 1}`);
      console.log(`Name: ${item.product.getName()}`);
      console.log(`Price: ${item.product.getPrice()}`);
      console.log(`Quantity: ${item.quantity}`);
      console.log(`Subtotal: ${item.product.getPrice() * item.quantity}`);
      console.log();
    }
  }

  displayCart() {
    console.log(`Customer Name: ${this.#customerName}`);
    console.log();

    this.showProductInfo();

    console.log(`Total: ${this.calculateTotal()}`);
  }
}

function main() {
  const product1 = new Product("Laptop", 45_000, 10);
  const product2 = new Product("Mouse", 700, 120);
  const product3 = new Product("ram", 21_000, 15);
  const product4 = new Product("monitor", 21_000, 1);

  // 1st customer
  const customer1 = new ShoppingCart("Lemuel");

  console.log(customer1.addItem(product1, 2));
  console.log(customer1.addItem(product2, 3));
  console.log(customer1.addItem(product3, 2));
  console.log(customer1.addItem(product4, 4));

  console.log();

  console.log("Available stock:")
  console.log(`${product1.getName()}: ${product1.getStock()}`);
  console.log(`${product2.getName()}: ${product2.getStock()}`);
  console.log(`${product3.getName()}: ${product3.getStock()}`);
  console.log(`${product4.getName()}: ${product4.getStock()}`);
  
  console.log();
  customer1.displayCart();
  
  // ===
  console.log("================")
  
  // 2nd customer
  console.log();
  const customer2 = new ShoppingCart("Jomar");
  
  console.log(customer2.addItem(product1, 4));
  console.log(customer2.addItem(product2, 3));
  console.log(customer2.addItem(product3, 2));
  console.log(customer2.addItem(product4, 1));
  
  console.log();
  
  console.log("Available stock:")
  console.log(`${product1.getName()}: ${product1.getStock()}`);
  console.log(`${product2.getName()}: ${product2.getStock()}`);
  console.log(`${product3.getName()}: ${product3.getStock()}`);
  console.log(`${product4.getName()}: ${product4.getStock()}`);
  
  console.log();
  customer2.displayCart();
}

main();
