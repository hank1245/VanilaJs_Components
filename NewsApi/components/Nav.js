/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
class Category extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render(category) {
    const nav = document.createElement('nav');
    nav.className = 'category-list';
    const list = document.createElement('ul');
    const ids = ['all', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
    const categories = ['전체보기', '비즈니스', '엔터테인먼트', '건강', '과학', '스포츠', '기술'];
    for (let i = 0; i < ids.length; i++) {
      const item = document.createElement('li');
      item.id = ids[i];
      item.className = 'category-item';
      item.innerText = categories[i];
      list.appendChild(item);
      if (item.id === category) {
        item.classList.add('active');
      }
    }
    nav.appendChild(list);
    document.querySelector('body').appendChild(nav);
    return nav;
  }
}

customElements.define('custom-nav', Category);
export default Category;
