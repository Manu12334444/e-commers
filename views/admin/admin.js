const user = JSON.parse(localStorage.getItem("customer"));

if (!user) {
  window.location.href = "/views/login/login.html";
}

if (user.rol !== "admin") {
  window.location.href = "/";
}

fetch("../../products.json")
  .then((response) => response.json())
  .then((data) => {
    new DataTable("#productsTable", {
      data,
      columns: [
        { data: "model" },
        { data: "category" },
        { data: "price" },
        { data: "stock" },
        {
          data: "rating",
          render: (data) => "★".repeat(data) + "☆".repeat(5 - data),
        },
      ],
      lengthMenu: [10, 20],
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
