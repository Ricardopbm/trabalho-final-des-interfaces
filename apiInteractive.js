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
            const apiKey = "783fa9444987c14b0fe9e30af777154d"; // Substitua com sua chave real
            const url = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${encodeURIComponent(numero)}`;


            const resposta = await fetch(url);
            const dados = await resposta.json();

            if (!dados.valid || dados.error) {
                alert("Número inválido ou erro na API.");
                return;
            }

            const secao = document.createElement("section");
            secao.className = "mt-4 p-3 bg-light border rounded";
            secao.innerHTML = `
        <h4>Informações do Número</h4>
        <p><strong>Número:</strong> ${dados.international_format}</p>
        <p><strong>País:</strong> ${dados.country_name}</p>
        <p><strong>Operadora:</strong> ${dados.carrier}</p>
      `;

            previewContainer.appendChild(secao);
        } catch (error) {
            alert("Erro ao consultar a API.");
            console.error(error);
        }
    });
}
