import StarRating from './star-rating/index.js';

const $containers = [...document.querySelectorAll('.star-rating')];
const $currentRatings = document.querySelectorAll('.current-rating > span');

$containers.forEach(($container, i) => {
  // star-rating 컨테이너 요소의 참조를 StarRating 함수에 전달해 star 요소들로 구성된 star-rating 요소를 동적 생성한다.
  let container = StarRating($container);
  console.log(container)
  container.querySelectorAll("i").forEach((star,i) =>{
    star.starValue = i+1;
    star.addEventListener("click", ()=>{
      let index = i+1;
      changeRating(index);
    })
    star.addEventListener("mouseover", () =>{
      let index = i+1;
      starHovered(index);
    })
  })

  $container.addEventListener('rating-change', e => {
    const rating = e.detail;
    $currentRatings[i].textContent = rating;
    $container.querySelectorAll("i").forEach((star) =>{
      if(star.starValue <=rating){
        star.classList.add("selected");
      }else{
        star.classList.remove("selected");
      }
    })
  });

  $container.addEventListener('star-hovered', e =>{
    $container.querySelectorAll("i").forEach((star) =>{
      if(star.starValue <= e.detail){
        star.classList.add("hovered");
      }else{
        star.classList.remove("hovered");
      }
    })
  });
  $container.addEventListener('mouseout', ()=>{
    $container.querySelectorAll("i").forEach((star) =>{
      star.classList.remove("hovered");
    })
  })

  function starHovered(index){
    const event = new CustomEvent('star-hovered',{
      detail:index
    });
    $container.dispatchEvent(event);
  }

  function changeRating(index){
    const event = new CustomEvent('rating-change',{
      detail: index
    });
    $container.dispatchEvent(event);
  };
});

const link = document.createElement('link');
link.href = 'star-rating/theme.css';
link.rel = 'stylesheet';
let Links = document.querySelectorAll('link');
Links[Links.length-1].after(link);