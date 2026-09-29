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

    // check if the quantity is not less than zero
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
  #addItemStatus;
  #ramainingStock;

  constructor(customerName = "customer") {
    this.#customerName = customerName;
    this.#items = [];
    this.#addItemStatus = [];
    this.#ramainingStock = [];
  }

  // add Item to items(Chart)
  // return if succesfull or not
  addItem(product, quantity) {
    const productName = product.getName();
    
    if (!product.reduceStock(quantity)) {
      const message = `Unable to add item: ${productName}`
      this.#addItemStatus.push(message);
      this.#ramainingStock.push(`Item: ${productName}, stock: ${product.getStock()}`);
      return message;
    }
    

    this.#items.push({
      product: product,
      quantity: quantity,
    });

    const message = `Item: ${productName} added successfully`
    this.#addItemStatus.push(message);
    this.#ramainingStock.push(`Item: ${productName}, stock: ${product.getStock()}`);
    return message;
  }

  /*
  show customer name
  show every list of item in the cart
  show the quantity of item and subtotal amount of the item
  show the total cost of the cart  
   */
  displayCart() {
    console.log(`Customer Name: ${this.#customerName}`);
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

  showAddItemStatusAndRamainingStock() {
    if (this.#addItemStatus.length === 0) {
      console.log("No item added");
      return;
    }

    this.#showAddItemStatus();
    this.#showTheRamainingStock();
    console.log();
  }

  /*
  show if the addItem is succefully added in the cart
  show the ramaining stock in the products
  */
  #showAddItemStatus() {
    console.log(`\nCustomer: ${this.#customerName}`);
    for (let i = 0; i < this.#addItemStatus.length; i++) {
      console.log(this.#addItemStatus[i]);
    }
  }

  // show the List product information
  #showListOfProductInfo() {
    if (this.#items.length === 0) {
      console.log("No item found");
      return;
    }

    for (let i = 0; i < this.#items.length; i++) {
      console.log(`Item ${i + 1}`);
      this.#showProductInfo(this.#items[i]);
    }
  }

  // show the ramaining stock of the product after added in the cart
  #showTheRamainingStock() {
    console.log("\nRamaining Stock");
    for (let i = 0; i < this.#ramainingStock.length; i++) {
      console.log(this.#ramainingStock[i]);
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
  const product2 = new Product("Mouse", 700, 25);
  const product3 = new Product("ram", 21_000, 15);
  const product4 = new Product("monitor", 21_000, 1);

  // Show the product information
  console.log(product1.productInfo());
  console.log(product2.productInfo());
  console.log(product3.productInfo());
  console.log(product4.productInfo());

  // console.log();

  // 1st customer
  const customer1 = new ShoppingCart("Lemuel");

  // add item to customer1 cart
  customer1.addItem(product1, 2);
  customer1.addItem(product2, 3);
  customer1.addItem(product3, 2);
  customer1.addItem(product4, 4);

  customer1.showAddItemStatusAndRamainingStock();
  customer1.displayCart();

  console.log("================");
  
  // 2nd customer
  console.log();
  const customer2 = new ShoppingCart("Jomar");
  
  // add item to customer2 cart
  customer2.addItem(product1, 4);
  customer2.addItem(product2, 3);
  customer2.addItem(product3, 2);
  customer2.addItem(product4, 1);
  
  customer2.showAddItemStatusAndRamainingStock();
  customer2.displayCart();
  console.log("================");
  
  // customer3
  const customer3 = new ShoppingCart("Jerome");
  
  customer3.showAddItemStatusAndRamainingStock();
  customer3.displayCart();
  console.log("================");
}

main();

