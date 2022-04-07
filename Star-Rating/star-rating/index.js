// do something!
const StarRating = (container) =>{
    container.classList.add('star-rating-container')
    let MAX = container.dataset.maxRating;
    for(let i=1; i <=MAX; i++){
        let star = document.createElement('i');
        star.className = "bx bxs-star"
        container.append(star)
    };
    return container;
}

export default StarRating;