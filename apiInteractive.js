export function setupApiInterativa(previewContainer) {
  const btn = document.getElementById("verificarTelefoneBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const numero = document.getElementById("telefoneInput").value.trim();
    if (!numero) {
      alert("Digite um número de telefone com DDI (ex: +5511999999999)");
      return;
    }

    try {
      const apiKey = "5a52dbebb28c4861bc1cce3f1416a29f";
      const url = `https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=${encodeURIComponent(numero)}`;

      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (!dados.valid) {
        alert("Número inválido.");
        return;
      }

      const secao = document.createElement("section");
      secao.className = "mt-4 p-3 bg-light border rounded";
      secao.innerHTML = `
        <h4>Informações do Número</h4>
        <p><strong>Número:</strong> ${dados.phone}</p>
        <p><strong>País:</strong> ${dados.country.name}</p>
        <p><strong>Operadora:</strong> ${dados.carrier}</p>
        <p><strong>Tipo:</strong> ${dados.type}</p>
        <p><strong>Localização:</strong> ${dados.location}</p>
      `;

      previewContainer.appendChild(secao);
    } catch (error) {
      alert("Erro ao consultar a API.");
      console.error(error);
    }
  });
}
