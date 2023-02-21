fetch("../data/products.json")
    .then(response => response.json())
    .then(data => {
        let products = data.products
        // console.log(products)
        let placeholder = document.querySelector(".column2__row");
        let drink = "";
        let topp = []
        let typeTopping = "";
        for (let product of products) {
            drink += `
                <div class="column2__card">
                    <div class="column2__card-items">
                        <p class="column2__card-items--id">MT-0${product.id}</p>
                        <p class="column2__card-items--name">${product.name}</p>
                        <p class="column2__card-items--topping">Topping</p>
                        <span class="column2__card-items--topping--name">${product.toppings}</span>
                        <p class="column2__card-items--price">$${product.price}</p>
                    </div>
                </div>
        `
            topp.push(...product.toppings)
        }
        placeholder.innerHTML = drink;
        // console.log(topp)
        let topps = [...new Set(topp)]
        // console.log(topps)

        for (let topp of topps) {
            typeTopping += `
                <div class="filter__toppings-toggle--items">
                    <input class="filter__toppings-toggle--input" type="checkbox" id="topping" value="">
                    <label class="filter__toppings-toggle--label" for="topping">${topp}</label>
                </div>
            `
        }
        document.querySelector(".filter__toppings").innerHTML = typeTopping;

        let a = ["Milk foam", "White pearl"]
        let toppingFilter = []
        let bs = products

        for (let a1 of a) {
            for (let b of bs) {
                let i = 0
                for (let topp of b.toppings) {
                    if (topp === a1) {
                        i++;
                    }
                }
                if (i === 0) {
                    bs.pop(b)
                }
            }
        }
        console.log(bs)

    })

function handleToggle() {
    var x = document.querySelector(".filter__toppings");
    if (x.style.display === "none") {
        x.style.display = "block";

    } else {
        x.style.display = "none";
    }
}