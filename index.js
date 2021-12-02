const products = ['lamp', 'chair', 'table', 'sofa'];

class ProductButton {
  constructor(product, products) {
    this.product = product;
    this.products = products;
  }

  getBtn() {
    return document.getElementById(this.product + '-btn');
  }
  getProducts(products) {
    return document.getElementsByClassName(products);
  }

  changeNonDisplayProducts() {
    this.product != 'all' &&
      this.products
        .filter((value) => value !== this.product)
        .forEach((item) => {
          Array.from(this.getProducts(item)).forEach((item) => {
            item.style.display = 'none';
          });
        });
  }

  changeBtnStyle() {
    Array.from(document.getElementById('products-menu').children).forEach(
      (btn) => {
        console.log(btn.firstChild.id);
        if (btn.firstChild.id === `${this.product}-btn`) {
          btn.firstChild.classList.remove('btn-unselect');
          btn.firstChild.classList.add('btn-selected');
        } else {
          btn.firstChild.classList.add('btn-unselect');
          btn.firstChild.classList.remove('btn-selected');
        }
      }
    );
  }

  changeDisplayProducts() {
    this.product === 'all'
      ? this.products.forEach((prod) => {
          Array.from(this.getProducts(prod)).forEach((item) => {
            item.style.display = 'block';
          });
        })
      : Array.from(this.getProducts(this.product)).forEach((item) => {
          item.style.display = 'block';
        });
  }

  btnClick() {
    this.getBtn().addEventListener('click', () => {
      this.changeNonDisplayProducts();
      this.changeDisplayProducts();
      this.changeBtnStyle();
    });
  }
}

products.forEach((prodBtn) => {
  new ProductButton(prodBtn, products).btnClick();
});

const allBtn = new ProductButton('all', products);

allBtn.btnClick();
