document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");

  // Guardar los valores originales
  const originalValues = {};
  Array.from(form.elements).forEach(input => {
    if (input.tagName === "INPUT") {
      originalValues[input.id] = input.value;
    }
  });

  // Función para destacar un campo modificado
  function highlightField(input) {
    input.style.borderColor = "green";
    input.style.backgroundColor = "#eaffea"; // verde clarito
  }

  // Función para quitar el destaque
  function removeHighlight(input) {
    input.style.borderColor = "";
    input.style.backgroundColor = "";
  }

  // Detectar cambios y actualizar estilo
  form.addEventListener("input", (e) => {
    const input = e.target;
    if (input.tagName !== "INPUT") return;

    if (input.value !== originalValues[input.id]) {
      highlightField(input);
    } else {
      removeHighlight(input);
    }
  });

  // Función para restaurar valores originales y quitar destaque
  function restoreOriginalValues() {
    for (const id in originalValues) {
      const input = document.getElementById(id);
      if (input) {
        input.value = originalValues[id];
        removeHighlight(input);
      }
    }
  }

  // Restaurar con botón (se crea dinámicamente)
  const restoreBtn = document.createElement("button");
  restoreBtn.type = "button";
  restoreBtn.textContent = "Restaurar Cambios";
  restoreBtn.classList.add("btn", "btn-secondary", "mt-3");
  form.appendChild(restoreBtn);

  restoreBtn.addEventListener("click", restoreOriginalValues);

  // También restaurar si se presiona ESC en cualquier campo
  form.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      restoreOriginalValues();
    }
  });
});