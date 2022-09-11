const card = document.querySelectorAll(".card");
let allcards = [...card];


let observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if(entry.intersectionRatio > 0.5){
                entry.target.classList.add("card-lazy");
            }
        })
    },
    {
        threshold:0.5
    }
);


function loadCards(){
    for(let i = 0; i < 10; i++){
        const acard = document.createElement("div");
        acard.classList.add("card");
        acard.textContent = "New Card";
        observer.observe(acard);
        document.querySelector(".container").append(acard);
        allcards.push(acard);
    }
}

const lastObserver = new IntersectionObserver(
    (entries) => {
        const lastCard = entries[0];
        if(lastCard.intersectionRatio <= 0) return;
        else if(lastCard.isIntersecting){
            document.querySelector("button").classList.add("active");
            document.querySelector("span").textContent = allcards.length;
            document.querySelector("button").addEventListener("click", () => {
                loadCards();
                console.log(allcards.length);
                document.querySelector("span").textContent = allcards.length;
            })
        }
        // lastObserver.unobserve(lastCard.target);
        lastObserver.observe(document.querySelector(".card:last-child"));
    },
    {}
);


allcards.forEach((cards) => {
    observer.observe(cards);
    lastObserver.observe(document.querySelector(".card:last-child"));
})
