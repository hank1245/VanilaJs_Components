/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { Category, NewsList } from './components/index.js';

const newsList = new NewsList();
const category = new Category();

const proxy = new Proxy({ category: 'all' }, {
  set(obj, prop, val) {
    obj[prop] = val;
    document.querySelector('.category-list').remove();
    const item = category.render(proxy.category);
    item.addEventListener('click', (e) => {
      if (e.target.id === '' || e.target.id === undefined) {
        e.target.id = 'all';
      }
      proxy.category = e.target.id;
    });
    document.querySelector('.news-list-container').remove();
    newsList.render(1, val);
    return true;
  },
});

const newsNav = category.render(proxy.category);
newsNav.addEventListener('click', (e) => {
  proxy.category = e.target.id;
});
newsList.render(1, proxy.category);
