const cards = [...document.querySelectorAll(".card")];
const number = document.querySelector("span");

console.log(cards);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add("card-lazy");
            }
            
        })
    },
    {
        threshold: 0.5
    }
);

const button = document.querySelector("button");
console.log(button);

const lastObserver = new IntersectionObserver(
    (entries) => {
        const lastCard = entries[0];
        console.log(lastCard);
        if(lastCard.intersectionRatio <= 0) return;
        button.classList.add("active")
        button.addEventListener("click", () => {
            loadMore(10);
            lastObserver.unobserve(lastCard.target);
            lastObserver.observe(document.querySelector(".container"));
        })
        number.textContent = cards.length;
    },
    {}
);

lastObserver.observe(document.querySelector(".container"));

cards.forEach(card => {
    observer.observe(card);
});


const container = document.querySelector(".container");
function loadMore(nbr){
    let newCards = [];
    for(let i = 0; i < nbr; i++){
        const acard = document.createElement("div");
        acard.classList.add("card");
        acard.textContent = "New Card";
        observer.observe(acard);
        container.append(acard);
        if(acard.isIntersecting){
            acard.classList.add("card-lazy");
        }
        newCards.push(acard);
    }
    cards.push.apply(cards, newCards);
}
