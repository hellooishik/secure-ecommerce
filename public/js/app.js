// Demo client-side validation
document.addEventListener("submit", function (e) {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(i => {
    if (i.value.trim() === "") {
      alert("All fields required");
      e.preventDefault();
    }
  });
});
