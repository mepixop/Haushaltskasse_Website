import firebaseConfig from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

$(document).ready(() => {
  getEntry();
});

// refer to elements declare variables
const newEntryBtn = document.getElementById("newEntryBtn");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const cancelBtn = document.getElementById("cancelBtn");
const saveButton = document.getElementById("saveButton");
const deleteButton = document.getElementById("deleteButton");
const entryForm = document.getElementById("entryForm");
const table = document.querySelector("table");
var url =
  "https://haushaltskassewebsite-default-rtdb.europe-west1.firebasedatabase.app/entry.json";

// Popup close
const closePopup = () => {
  popup.style.display = "none";
  overlay.style.display = "none";
  entryForm.reset();
};

// Popup open
var openPopup = (entry, id) => {
  saveButton.style.display = "inline-block";

  if (entry) {
    document.getElementById("beschreibung").value = entry.description || "";
    document.getElementById("betrag").value = entry.amount || "";
    document.getElementById("typ").value = entry.type || "";
    document.getElementById("datum").value = entry.date || "";
    document.getElementById("benutzer").value = entry.user || "";
    document.getElementById("kategorie").value = entry.category || "";

    saveButton.textContent = "Update";
    saveButton.onclick = () => {
      changeEntry(id);
    };

    deleteButton.style.display = "inline-block";
    deleteButton.onclick = () => {
      deleteEntry(id);
    };
  } else {
    saveButton.textContent = "Speichern";
    deleteButton.style.display = "none";
  }
  popup.style.display = "block";
  overlay.style.display = "block";
};

//Firebase functionalities
//Posts the data to firebase
var sendEntry = () => {
  const description = document.getElementById("beschreibung").value;
  const amount = document.getElementById("betrag").value;
  const typ = document.getElementById("typ").value;
  const date = document.getElementById("datum").value;
  const user = document.getElementById("benutzer").value;
  const kategorie = document.getElementById("kategorie").value;

  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify({
      description: description,
      amount: amount,
      type: typ,
      date: date,
      user: user,
      category: kategorie,
    }),
    success: (res, status) => {
      console.log(res);
    },
  });
};

//fill data into table
var populateTable = (entries) => {
  const table = $("#dataTable tbody");
  table.find("tr:gt(0)").remove();
  for (const id in entries) {
    if (entries.hasOwnProperty(id)) {
      const entry = entries[id];
      const row = `
                      <tr data-id="${id}" >
                        <td>${entry.description || "N/A"}</td>
                        <td>${entry.amount || "0"}</td>
                        <td>${entry.type || "N/A"}</td>
                        <td>${entry.date || "N/A"}</td>
                        <td>${entry.user || "N/A"}</td>
                        <td>${entry.category || "N/A"}</td>
                      </tr>`;
      table.append(row);
    }
  }
  $("tr[data-id]").click(function () {
    const id = $(this).data("id");
    const entry = entries[id];
    openPopup(entry, id);
  });
};

//Get the data from firebase
var getEntry = () => {
  $.ajax({
    url: url,
    type: "GET",
    success: (data) => {
      populateTable(data);
    },
    error: (xhr, status, error) => {
      console.error("Fehler beim Abrufen der Einträge:", error);
    },
  });
};

//delete Data from firebase
const deleteEntry = (id) => {
  if (!id) {
    console.error("No ID provided for deletion");
    return;
  }
  const confirmDelete = confirm("Möchten Sie diesen Eintrag wirklich löschen?");
  if (!confirmDelete) {
    return;
  }

  const entryRef = ref(database, `entry/${id}`);

  set(entryRef, null)
    .then(() => {
      console.log(`Entry with ID ${id} successfully deleted.`);
      alert("Eintrag wurde gelöscht.");
      getEntry();
      closePopup();
    })
    .catch((error) => {
      console.error("Fehler beim Löschen des Eintrags:", error);
      alert("Eintrag konnte nicht gelöscht werden.");
    });
};

//ALL EVENT LISTENERS
//submit the popup
entryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (saveButton.textContent === "Speichern") {
    sendEntry();
  } else if (saveButton.textContent === "Update") {
  }
  getEntry();
  closePopup();
});

//Event listener click
newEntryBtn.addEventListener("click", () => {
  openPopup();
});
overlay.addEventListener("click", () => {
  closePopup();
});
cancelBtn.addEventListener("click", () => {
  closePopup();
});

const toggleButton = document.getElementById("darkmode-toggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
  body.classList.toggle("darkmode"); // Darkmode Klasse für das Body-Element umschalten

  // Button-Text anpassen
  if (body.classList.contains("darkmode")) {
    toggleButton.textContent = "LIGHTMODE";
  } else {
    toggleButton.textContent = "DARKMODE";
  }
});
