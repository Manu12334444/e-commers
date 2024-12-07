const loginForm = document.getElementById("login-form");

const customers = JSON.parse(localStorage.getItem('customers')) ?? [];

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");

    // Validar el email y la contraseña
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email === "" || password === "") {
        return elert("Por favor, rellena todos los campos");
    }

    let customer;

    customers.map((crrCustomer) => {
        if (crrCustomer.email === email) {
            crrCustomer.password = password;
            customer = crrCustomer;
            return crrCustomer;
        }
    });

    console.log(customers)
    console.log(customer)

    localStorage.setItem("customers", JSON.stringify(customers))

    localStorage.setItem("customer", JSON.stringify(customer));

    const redirection = {
        admin: "/views/admin/admin.html",
        user: "/",
    };

    if (customer) window.location.href = redirection[customer.rol];
});
