document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const table = document.getElementById("dataTable");
  const tableRows = table.getElementsByTagName("tr");

  searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();
    for (let i = 1; i < tableRows.length; i++) {
      const row = tableRows[i];
      let rowText = row.textContent.toLowerCase();
      if (rowText.includes(filter)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
});
