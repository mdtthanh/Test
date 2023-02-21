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
            topp.push(...product.toppings)
        }
        let topps = [...new Set(topp)]
        // console.log(topps)

        for (let topp of topps) {
            typeTopping += `
                <div class="filter__toppings-toggle--items">
                    <input class="filter__toppings-toggle--input" type="checkbox" name="topping" id="topping" value="${topp}">
                    <label class="filter__toppings-toggle--label" for="">${topp}</label>
                </div>
            `
        }
        document.querySelector(".filter__toppings").innerHTML = typeTopping;

        const checkboxes = document.querySelectorAll('input[type=checkbox]');

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', filterProduct);
        });
        function filterProduct() {
            const filters = [];
            const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
            checkedBoxes.forEach((checkbox) => {
                const value = checkbox.value;
                filters.push(value);
            })
            console.log(filters)

            const result = products.filter(product => {
                return product.toppings && product.toppings.length && filters.every(topping => product.toppings.includes(topping));
            });
            console.log(result)
            
            for (let product of result) {
                drink += `
                    <div class="column2__card" >
                        <div class="column2__card-items">
                            <p class="column2__card-items--id">MT-0${product.id}</p>
                            <p class="column2__card-items--name">${product.name}</p>
                            <p class="column2__card-items--topping">Topping</p>
                            <span class="column2__card-items--topping--name">${product.toppings}</span>
                            <p class="column2__card-items--price">$${product.price}</p>
                        </div>
                    </div>
            `
            }
            placeholder.innerHTML = drink;

            // if (filters.length = 0) {
            //     appearProduct(products)
            //     console.log(data.products)
            // }
            // else {
            //     appearProduct(result)
            // }
        }

    })

