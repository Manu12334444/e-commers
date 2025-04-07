const loginForm = document.getElementById("login-form");

const customers = JSON.parse(localStorage.getItem('customers')) ?? [];

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const passwordRepeatInput = document.querySelector("#password-repeat");

    // Validar el email y la contraseña
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordRepeat = passwordRepeatInput.value

    if (email === "" || password === "" || passwordRepeat === "") {
        return elert("Por favor, rellena todos los campos");
    }

    console.log(customers)

    let customer = customers.find((customer) => {
        if (customer.email === email && customer.password === password) {
            localStorage.setItem("customer", JSON.stringify(customer));
            return customer;
        }
    });

    if (!customer) {
        const newUser = {email, password, rol: "user"}
        customer = newUser

        customers.push(newUser)

        localStorage.setItem("customer", JSON.stringify(newUser));
        localStorage.setItem('customers', JSON.stringify(customers))
    }
    console.log(customer)

    const redirection = {
        admin: "/views/admin/admin.html",
        user: "/",
    };

    if (customer) window.location.href = redirection[customer.rol];
});
