const d = document,
  $main = d.querySelector("main");

//* Obtener el HTML usando XMLHttpRequest.
const getHTML = (options) => {
  let { url, success, error } = options;
  const xhr = new XMLHttpRequest();

  //* Se carga cuando cambia el estado de la solicitud.
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let html = xhr.responseText;
      success(html); // Fn de éxito con el contenido HTML.
    } else {
      let message = xhr.statusText || "Ocurrió un error";
      error(`Error ${xhr.status}: ${message}`);
    }
  });

  //* Configura y envía la solicitud HTTP.
  xhr.open("GET", url); // Establece el método "GET" y la URL del recurso.
  xhr.setRequestHeader("Content-type", "text/html; charset=utf-8"); // Configura encabezado
  xhr.send(); // Envía la solicitud.
};

//* Carga inicial
d.addEventListener("DOMContentLoaded", (e) => {
  getHTML({
    url: "assets/home.html", // URL del archivo HTML a cargar inicial.
    success: (html) => ($main.innerHTML = html),
    error: (err) => ($main.innerHTML = `<h1>${err}</h1>`),
  });
});

//* Manejar los enlaces del menú.
d.addEventListener("click", (e) => {
  if (e.target.matches(".menu a")) {
    e.preventDefault();
    getHTML({
      url: e.target.href, // Usa la URL del enlace como destino.
      success: (html) => ($main.innerHTML = html), // carga el contenido en el <main>.
      error: (err) => ($main.innerHTML = `<h1>${err}</h1>`), // Si falla
    });
    d;
  }
});
