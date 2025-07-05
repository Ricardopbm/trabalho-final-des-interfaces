export function setupMultiApi(previewContainer) {
    const btn = document.getElementById("carregarAPIsBtn");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        try {
            const catURL = "https://api.thecatapi.com/v1/images/search";
            const dogURL = "https://api.thedogapi.com/v1/images/search";
            const jokeURL = "https://official-joke-api.appspot.com/jokes/random";

            const [catRes, dogRes, jokeRes] = await Promise.all([
                fetch(catURL).then(r => r.json()),
                fetch(dogURL).then(r => r.json()),
                fetch(jokeURL).then(r => r.json())
            ]);

            const setup = jokeRes.setup || 'Piada indisponível.';
            const punchline = jokeRes.punchline || '';

            const secao = document.createElement("section");
            secao.className = "mt-4 p-3 bg-light border rounded";
            secao.innerHTML = `
        <h4>Resultado das APIs</h4>
        <p><strong>Gato do dia:</br></strong><img src="${catRes[0]?.url}" alt="Dog" style="max-width:200px; border-radius:10px; margin-top:10px">
        <p><strong>Cachorro do dia:</br></strong><img src="${dogRes[0]?.url}" alt="Dog" style="max-width:200px; border-radius:10px; margin-top:10px">
        <p><strong>Piada Aleatória:</strong><br>${setup}<br><em>${punchline}</em></p>
`
            previewContainer.appendChild(secao);
        } catch (err) {
            alert("Erro ao consultar as APIs.");
            console.error(err);
        }
    });
}
