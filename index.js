AOS.init({
  once: true,
});
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
      this.products.forEach((item) => {
        Array.from(this.getProducts(item)).forEach((item) => {
          item.style.display = 'none';
        });
      });
  }

  changeBtnStyle() {
    Array.from(document.getElementById('products-menu').children).forEach(
      (btn) => {
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
            console.log(item.className);
            gsap.fromTo(
              `.${item.className}`,
              {
                scale: 0.1,
                opacity: 0.1,
              },
              {
                duration: 0.3,
                scale: 1,
                opacity: 1,
              }
            );
          });
        })
      : Array.from(this.getProducts(this.product)).forEach((item) => {
          item.style.display = 'block';
          gsap.fromTo(
            `.${this.product}`,
            {
              scale: 0.1,
              opacity: 0.1,
            },
            {
              duration: 0.3,
              scale: 1,
              opacity: 1,
            }
          );

        });
  }

  btnClick() {
    this.getBtn().addEventListener('click', () => {
      if (!this.getBtn().className.includes('btn-selected')) {
        this.changeNonDisplayProducts();
        this.changeDisplayProducts();
      }
      this.changeBtnStyle();
    });
  }
}

products.forEach((prodBtn) => {
  new ProductButton(prodBtn, products).btnClick();
});

const allBtn = new ProductButton('all', products);

allBtn.btnClick();

const btnShowcaseR = document.getElementById('btn-showcase-r');
const btnShowcaseL = document.getElementById('btn-showcase-l');
const showcaseList = document.getElementById('showcases-list');
const showcaseLisElements = showcaseList.children.length;
let showcaseLocation = 0;

btnShowcaseR.addEventListener('click', () => {
  showcaseLocation++;
  if (showcaseLocation > showcaseLisElements - 1) {
    showcaseLocation = 0;
  }
  showcaseList.children[
    showcaseLocation === 0 ? showcaseLisElements - 1 : showcaseLocation - 1
  ].classList.add('dis-none');
  showcaseList.children[
    showcaseLocation === 0 ? showcaseLisElements - 1 : showcaseLocation - 1
  ].classList.remove('dis-block');
  showcaseList.children[showcaseLocation].classList.add('dis-block');
  showcaseList.children[showcaseLocation].classList.remove('dis-none');
});

btnShowcaseL.addEventListener('click', () => {
  showcaseLocation--;
  if (showcaseLocation < 0) {
    showcaseLocation = showcaseLisElements - 1;
  }

  showcaseList.children[
    showcaseLocation + 1 === showcaseLisElements ? 0 : showcaseLocation + 1
  ].classList.add('dis-none');
  showcaseList.children[
    showcaseLocation + 1 === showcaseLisElements ? 0 : showcaseLocation + 1
  ].classList.remove('dis-block');

  showcaseList.children[showcaseLocation].classList.add('dis-block');
  showcaseList.children[showcaseLocation].classList.remove('dis-none');
});
