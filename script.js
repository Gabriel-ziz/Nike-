/* =========================================================
   NIKE PROJECT
   JAVASCRIPT
========================================================= */


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 1800);

});



/* =========================================================
   CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorFollow = document.querySelector(".cursor-follow");


document.addEventListener("mousemove", (event) => {

    if (cursor) {

        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";

    }

    if (cursorFollow) {

        cursorFollow.animate(

            {
                left: event.clientX + "px",
                top: event.clientY + "px"
            },

            {
                duration: 350,
                fill: "forwards"
            }

        );

    }

});



/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   COUNTER
========================================================= */

function animateCounter(element) {

    const target =
        Number(element.dataset.target);

    let current = 0;

    const duration = 1600;

    const startTime =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - startTime) / duration,
                1
            );


        const eased =
            1 - Math.pow(1 - progress, 3);


        current =
            Math.floor(target * eased);


        element.textContent =
            current.toLocaleString("pt-BR");


        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }


    requestAnimationFrame(update);

}


const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    counterObserver.unobserve(
                        entry.target
                    );

                }

            });

        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});



/* =========================================================
   CALCULADORA
========================================================= */

const productionInput =
    document.getElementById("productionCost");

const logisticsInput =
    document.getElementById("logisticsCost");

const marketingInput =
    document.getElementById("marketingCost");

const otherInput =
    document.getElementById("otherCost");

const marginInput =
    document.getElementById("profitMargin");

const calculateButton =
    document.getElementById("calculateButton");



const money = value => {

    return Number(value).toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

};



function calculatePrice() {


    const production =
        Number(productionInput.value) || 0;


    const logistics =
        Number(logisticsInput.value) || 0;


    const marketing =
        Number(marketingInput.value) || 0;


    const other =
        Number(otherInput.value) || 0;


    let margin =
        Number(marginInput.value) || 0;


    margin =
        Math.min(
            Math.max(margin, 0),
            90
        );


    const totalCosts =
        production +
        logistics +
        marketing +
        other;


    /*
        Fórmula:

        preço = custos / (1 - margem)

        Isso permite calcular um preço onde
        a margem desejada representa uma
        porcentagem do preço final.
    */

    const finalPrice =
        margin >= 100
            ? totalCosts
            : totalCosts / (1 - margin / 100);


    const estimatedProfit =
        finalPrice - totalCosts;


    const actualMargin =
        finalPrice > 0
            ? (estimatedProfit / finalPrice) * 100
            : 0;


    /*
        RESULTADOS
    */

    document.getElementById("finalPrice")
        .textContent = money(finalPrice);


    document.getElementById("totalCosts")
        .textContent = "R$ " + money(totalCosts);


    document.getElementById("estimatedProfit")
        .textContent = "R$ " + money(estimatedProfit);


    document.getElementById("displayMargin")
        .textContent = actualMargin.toFixed(1) + "%";


    /*
        PORCENTAGENS
    */

    const productionPercent =
        totalCosts > 0
            ? production / totalCosts * 100
            : 0;


    const logisticsPercent =
        totalCosts > 0
            ? logistics / totalCosts * 100
            : 0;


    const marketingPercent =
        totalCosts > 0
            ? marketing / totalCosts * 100
            : 0;


    const otherPercent =
        totalCosts > 0
            ? other / totalCosts * 100
            : 0;


    updateBar(
        "productionBar",
        "productionPercent",
        productionPercent
    );


    updateBar(
        "logisticsBar",
        "logisticsPercent",
        logisticsPercent
    );


    updateBar(
        "marketingBar",
        "marketingPercent",
        marketingPercent
    );


    updateBar(
        "otherBar",
        "otherPercent",
        otherPercent
    );


    /*
        GRÁFICO
    */

    const costPercentage =
        finalPrice > 0
            ? (totalCosts / finalPrice) * 100
            : 0;


    const profitPercentage =
        finalPrice > 0
            ? (estimatedProfit / finalPrice) * 100
            : 0;


    const costBar =
        document.getElementById("chartCostBar");

    const profitBar =
        document.getElementById("chartProfitBar");


    costBar.style.height =
        Math.max(costPercentage, 5) + "%";


    profitBar.style.height =
        Math.max(profitPercentage, 5) + "%";


    costBar.querySelector("strong")
        .textContent =
        costPercentage.toFixed(1) + "%";


    profitBar.querySelector("strong")
        .textContent =
        profitPercentage.toFixed(1) + "%";


    /*
        HIGHLIGHTS
    */

    document.getElementById("chartCost")
        .textContent =
        "R$ " + money(totalCosts);


    document.getElementById("chartProfit")
        .textContent =
        "R$ " + money(estimatedProfit);


    document.getElementById("chartPrice")
        .textContent =
        "R$ " + money(finalPrice);

}



function updateBar(
    barId,
    percentageId,
    percentage
) {

    document.getElementById(barId)
        .style.width =
        Math.min(percentage, 100) + "%";


    document.getElementById(percentageId)
        .textContent =
        percentage.toFixed(1) + "%";

}



/* =========================================================
   CALCULAR
========================================================= */

calculateButton.addEventListener(
    "click",
    calculatePrice
);



/* =========================================================
   CALCULA AUTOMATICAMENTE
========================================================= */

[
    productionInput,
    logisticsInput,
    marketingInput,
    otherInput,
    marginInput

].forEach(input => {

    input.addEventListener(
        "input",
        calculatePrice
    );

});


/* cálculo inicial */

calculatePrice();



/* =========================================================
   INTERAÇÃO DO AIR FORCE
========================================================= */

const shoe =
    document.getElementById("shoe");


if (shoe) {


    shoe.addEventListener(
        "mousemove",
        event => {


            const rect =
                shoe.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const rotateY =
                ((x / rect.width) - .5) * 12;


            const rotateX =
                ((y / rect.height) - .5) * -12;


            shoe.style.animation =
                "none";


            shoe.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.08)
                `;

        }

    );


    shoe.addEventListener(
        "mouseleave",
        () => {

            shoe.style.transform = "";

            shoe.style.animation =
                "shoeFloat 5s ease-in-out infinite";

        }

    );

}



/* =========================================================
   EFEITO NOS BOTÕES
========================================================= */

document
    .querySelectorAll(".button")
    .forEach(button => {


        button.addEventListener(
            "mouseenter",
            () => {

                if (cursorFollow) {

                    cursorFollow.style.width =
                        "60px";

                    cursorFollow.style.height =
                        "60px";

                }

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                if (cursorFollow) {

                    cursorFollow.style.width =
                        "35px";

                    cursorFollow.style.height =
                        "35px";

                }

            }
        );

    });



/* =========================================================
   PARALLAX SUAVE
========================================================= */

const backgroundText =
    document.querySelector(".hero-background-text");


window.addEventListener(
    "scroll",
    () => {


        if (!backgroundText)
            return;


        const scroll =
            window.scrollY;


        backgroundText.style.transform =
            `translateY(${scroll * .15}px)`;

    }

);



/* =========================================================
   CONSOLE
========================================================= */

console.log(
`
╔══════════════════════════════════════╗
║          NIKE PROJECT                ║
║                                      ║
║        JUST DO IT.                   ║
║                                      ║
║   Air Force 1 Experience             ║
╚══════════════════════════════════════╝
`
);