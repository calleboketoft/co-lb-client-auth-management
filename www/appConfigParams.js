if (!localStorage["appConfigParams"]) {
  window["appConfigParams"] = {
    apiUrl: "http://localhost:3001"
  }
} else {
  window["appConfigParams"] = JSON.parse(localStorage["appConfigParams"])
}
