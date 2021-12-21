AOS.init({
  once: true,
});

const burgerCheckbox = document.getElementById('burger-check');
const nav = document.getElementById('burger-nav');

burgerCheckbox.addEventListener('change', (e) => {
  e.target.checked
    ? (nav.style.display = 'block')
    : (nav.style.display = 'none');
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burgerCheckbox.contains(e.target)) {
    nav.style.display = 'none';
    burgerCheckbox.checked = false;
  }
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

const prodAllBtn = new ProductButton('all', products);

prodAllBtn.btnClick();

const btnShowcaseR = document.getElementById('btn-showcase-r');
const btnShowcaseL = document.getElementById('btn-showcase-l');
const showcaseList = document.getElementById('showcases-list');
const showcaseLisElements = showcaseList.children.length;
let showcaseLocation = 0;

const showcaseHandle = (mut) => {
  mut ? showcaseLocation++ : showcaseLocation--;
  showcaseLocation > showcaseLisElements - 1 ? (showcaseLocation = 0) : null;
  showcaseLocation < 0 ? (showcaseLocation = showcaseLisElements - 1) : null;
  gsap.fromTo(
    showcaseList.children[
      mut
        ? showcaseLocation === 0
          ? showcaseLisElements - 1
          : showcaseLocation - 1
        : showcaseLocation + 1 === showcaseLisElements
        ? 0
        : showcaseLocation + 1
    ],
    { opacity: 1, transform: 'translateX(0%)' },
    {
      opacity: 0,
      transform: 'translateX(70%)',
      duration: 0.4,
      onComplete: () => {
        showcaseList.children[
          mut
            ? showcaseLocation === 0
              ? showcaseLisElements - 1
              : showcaseLocation - 1
            : showcaseLocation + 1 === showcaseLisElements
            ? 0
            : showcaseLocation + 1
        ].classList.remove('dis-block');
        showcaseList.children[
          mut
            ? showcaseLocation === 0
              ? showcaseLisElements - 1
              : showcaseLocation - 1
            : showcaseLocation + 1 === showcaseLisElements
            ? 0
            : showcaseLocation + 1
        ].classList.add('dis-none');

        showcaseList.children[showcaseLocation].classList.remove('dis-none');
        showcaseList.children[showcaseLocation].classList.add('dis-block');
        gsap.fromTo(
          showcaseList.children[showcaseLocation],
          { opacity: 0, transform: 'translateX(150%)' },
          {
            opacity: 1,
            transform: 'translateX(0%)',
            duration: 0.4,
          }
        );
      },
    }
  );
};

btnShowcaseR.addEventListener('click', () => {
  showcaseHandle(true);
});

btnShowcaseL.addEventListener('click', () => {
  showcaseHandle(false);
});
