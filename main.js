import { atualizarPreview, mostrarCodigo, salvarLocal, carregarLocal, limparLocal } from './editor.js';
import { setupApiInterativa } from './apiInteractive.js';
import { setupMultiApi } from './multiApiSection.js';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.form-section').forEach(section => section.classList.remove('expanded'));

  window.atualizarPreview = atualizarPreview;
  window.mostrarCodigo = mostrarCodigo;
  window.salvarLocal = salvarLocal;
  window.carregarLocal = carregarLocal;
  window.limparLocal = limparLocal;

  window.toggleSidebar = () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  };

  window.toggleSection = (element) => {
    element.parentElement.classList.toggle('expanded');
  };

  const headerImgInput = document.getElementById('headerImg');
  const menuImgInput = document.getElementById('menuImg');

  if (headerImgInput) {
    headerImgInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => window.headerImgURL = e.target.result;
        reader.readAsDataURL(file);
      }
    });
  }

  if (menuImgInput) {
    menuImgInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => window.menuImgURL = e.target.result;
        reader.readAsDataURL(file);
      }
    });
  }

  const preview = document.getElementById("preview");
  setupApiInterativa(preview);
  setupMultiApi(preview);
});
