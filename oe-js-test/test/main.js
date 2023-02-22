fetch("../data/products.json")
    .then((response) => response.json())
    .then((data) => {
        let products = data.products;
        let placeholder = document.querySelector(".column2__row");
        let topp = [];
        let typeTopping = "";
        for (let product of products) {
            topp.push(...product.toppings);
        }
        let topps = [...new Set(topp)];

        for (let topp of topps) {
            typeTopping += `
                <div class="filter__toppings-toggle--items">
                    <input class="filter__toppings-toggle--input" type="checkbox" name="topping" id="topping-${topp}" value="${topp}">
                    <label class="filter__toppings-toggle--label" for="topping-${topp}">${topp}</label>
                </div>  
            `;
        }
        document.querySelector(".filter__toppings").innerHTML = typeTopping;

        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        const selectBox = document.querySelector("#sort-select");

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', filterProduct);
        });

        selectBox.addEventListener('change', () => {
            filterProduct();
          });

        function filterProduct() {
            const selectedValue = selectBox.value;
            const filters = [];
            const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
            checkedBoxes.forEach((checkbox) => {
                const value = checkbox.value;
                filters.push(value);
            });

            let filteredProducts;
            if (filters.length === 0) {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter((product) => {
                    return (
                        product.toppings &&
                        product.toppings.length &&
                        filters.every((topping) => product.toppings.includes(topping))
                    );
                });
            }

            if (selectedValue === "price-asc") {
                filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
              } else if (selectedValue === "price-desc") {
                filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
              } else if (selectedValue === "name-asc") {
                filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
              } else if (selectedValue === "name-desc") {
                filteredProducts = filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
              }
            if (filteredProducts.length === 0) {
                placeholder.innerHTML = "<p>No products match the selected filters</p>";
            } else {
                let drink = "";
                for (let product of filteredProducts) {
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
                    `;
                }
                placeholder.innerHTML = drink;
            }
        }
        filterProduct();
    });
