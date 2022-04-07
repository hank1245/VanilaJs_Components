/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */

class NewsList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render(pageNumber, category) {
    const container = document.createElement('div');
    container.className = 'news-list-container';
    const article = document.createElement('article');
    article.className = 'news-list';
    let sections = [];
    for (let i = 0; i < 5; i++) {
      const section = document.createElement('section');
      section.className = 'news-item';
      sections.push(section);
    }
    sections = await this.getNews(sections, pageNumber, category);
    sections.forEach((section) => {
      article.appendChild(section);
    });

    const observer = document.createElement('div');
    observer.className = 'scroll-observer';
    const image = document.createElement('img');
    image.src = './img/ball-triangle.svg';
    observer.appendChild(image);

    const Observerobj = new IntersectionObserver((entries) => {
      const triangle = entries[0];
      if (!triangle.isIntersecting) return;
      pageNumber += 1;
      const newSections = [];
      for (let i = 0; i < 5; i++) {
        const section = document.createElement('section');
        section.className = 'news-item';
        newSections.push(section);
      }
      this.getNews(newSections, pageNumber, category);
      newSections.forEach((card) => {
        article.appendChild(card);
      });
    }, {
      threshold: 1,
    });

    Observerobj.observe(observer);

    container.appendChild(article);
    container.appendChild(observer);
    document.querySelector('body').appendChild(container);
  }

  async getNews(sections, pageNumber, category) {
    // eslint-disable-next-line no-undef
    const news = await axios.get(`http://newsapi.org/v2/top-headlines?country=kr&category=${category === 'all' ? '' : category}&pageSize=5&page=${pageNumber}&apikey=`);
    const cards = sections;
    for (let i = 0; i < news.data.articles.length; i++) {
      cards[i].innerHTML = `<div class='thumbnail'><a href="${news.data.articles[i].url}" target="_blank"><img src="${news.data.articles[i].urlToImage}"></a>
            </div>
            <div class='contents'>
                <h2><a href='${news.data.articles[i].url}'>${news.data.articles[i].title}</a></h2>
                <p>${news.data.articles[i].description}</p>
            </div>`;
    }
    return sections;
  }
}

customElements.define('news-list', NewsList);

export default NewsList;
