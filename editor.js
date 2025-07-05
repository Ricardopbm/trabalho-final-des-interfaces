export let formFields = [];
export let headerImgURL = '';
export let menuImgURL = '';

export function atualizarPreview() {
    let html = '';

    // Cabeçalho
    const ht = document.getElementById('headerText').value.trim();
    const hbg = document.getElementById('headerBg').value;
    const htc = document.getElementById('headerTextColor').value;
    const hbdr = document.getElementById('headerBorder').value;
    const halign = document.getElementById('headerAlign').value;
    const hfontSize = document.getElementById('headerFontSize').value;

    // Se tiver informações para atualizar, atualiza o html
    if (ht || headerImgURL) {
        html += `<header style="background:${hbg}; color:${htc}; border:${hbdr}; text-align:${halign}; padding:20px;">`;
        if (headerImgURL) html += `<img alt="Imagem do Cabeçalho" src="${headerImgURL}" style="max-height:100px; margin:10px auto; display:block">`;
        if (ht) html += `<h1 style="font-size:${hfontSize}px">${ht}</h1>`;
        html += `</header>`;
    }

    // Menu 
    const menuItems = document.getElementById('menuItems').value.split(',').map(i => i.trim()).filter(Boolean);
    const menuBg = document.getElementById('menuBgColor').value;
    const menuTextColor = document.getElementById('menuTextColor').value;

    // Se tiver informações para atualizar, atualiza o html

    if (menuImgURL || menuItems.length) {  // Alterado esta condição
        html += `<nav style="background:${menuBg}; padding:10px; color:${menuTextColor}; display:flex; align-items:center; gap:10px;">`;
        if (menuImgURL) html += `<img alt="Imagem do menu" src="${menuImgURL}" style="height:40px">`;
        if (menuItems.length) html += menuItems.map(i => `<span class='menu-item'>${i}</span>`).join('');
        html += '</nav>';
    }

    // Galeria
    const galStr = document.getElementById('galleryItems').value.trim();
    const galBg = document.getElementById('galleryCardBg').value;
    const galTextColor = document.getElementById('galleryTextColor')?.value || '#000000';
    const galBorderColor = document.getElementById('galleryBorderColor')?.value || '#cccccc';
    const galFontSize = document.getElementById('galleryFontSize')?.value || '14';
    const galPadding = document.getElementById('galleryPadding')?.value || '10';

    if (galStr) {
        html += '<section class="d-flex flex-wrap gap-3 mt-3">';
        galStr.split(';').forEach(card => {
            const [url, desc] = card.split('|');
            if (url || desc) {
                html += `<div class='card' style='background:${galBg}; color:${galTextColor}; border:1px solid ${galBorderColor}; font-size:${galFontSize}px; padding:${galPadding}px;'>`;
                if (url) html += `<img alt="Imagem da galeria" src='${url}' class='card-img-top'>`;
                if (desc) html += `<div class='card-body'><p>${desc}</p></div>`;
                html += '</div>';
            }
        });
        html += '</section>';
    }


    // Formulário
    const formTitle = document.getElementById('formTitle').value.trim();
    const formBg = document.getElementById('formBgColor').value;

    // Se tiver informações para atualizar, atualiza o html

    if (formFields.length || formTitle) {
        html += `<form style='background:${formBg}; padding:15px;' class='mt-4'>`;
        if (formTitle) html += `<h3>${formTitle}</h3>`;

        // Foreach para cada tipo de campo

        const labelTextColor = document.getElementById('labelTextColor')?.value || '#000000';
        const labelFontSize = document.getElementById('labelFontSize')?.value || '14';

        const inputBgColor = document.getElementById('inputBgColor')?.value || '#ffffff';
        const inputTextColor = document.getElementById('inputTextColor')?.value || '#000000';
        const inputBorderColor = document.getElementById('inputBorderColor')?.value || '#cccccc';
        const inputFontSize = document.getElementById('inputFontSize')?.value || '14';

        formFields.forEach(field => {
            const labelStyle = `color:${labelTextColor}; font-size:${labelFontSize}px;`;
            const inputStyle = `background:${inputBgColor}; color:${inputTextColor}; border:1px solid ${inputBorderColor}; font-size:${inputFontSize}px;`;

            if (field.type === 'textarea') {
                html += `
                    <div class='mb-2'>
                        <label class='form-label' style="${labelStyle}">${field.label}</label>
                        <textarea class='form-control' style="${inputStyle}"></textarea>
                    </div>`;
            } else if (field.type === 'checkbox') {
                html += `
                    <div class='mb-2 form-check'>
                        <input type='checkbox' class='form-check-input' id='${field.id}' style="${inputStyle}">
                        <label class='form-check-label' for='${field.id}' style="${labelStyle}">${field.label}</label>
                    </div>`;
            } else {
                html += `
                    <div class='mb-2'>
                        <label class='form-label' style="${labelStyle}">${field.label}</label>
                        <input type='${field.type}' class='form-control' style="${inputStyle}">
                    </div>`;
            }
        });
    }

    // Rodapé
    const rodText = document.getElementById('footerText').value.trim();
    const rodBg = document.getElementById('footerBgColor').value;
    const rodFont = document.getElementById('footerFontColor').value;
    const rodAlign = document.getElementById('footerAlign').value;
    const rodFontSize = document.getElementById('footerFontSize').value + 'px';

    // Se tiver informações para atualizar, atualiza o html

    if (rodText) {
        html += `<footer style='background:${rodBg}; color:${rodFont}; text-align:${rodAlign}; font-size:${rodFontSize}; padding:10px;' class='mt-4'>${rodText}</footer>`;
    }

    document.getElementById('preview').innerHTML = html || '<p class="text-muted">Nada para mostrar ainda...</p>';
}

export function mostrarCodigo() {
    const html = document.getElementById('preview').innerHTML;
    const completo = `<!DOCTYPE html>\n<html lang='pt-br'>\n<head>\n<meta charset='UTF-8'>\n<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n<title>Título da Página</title>\n<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body>\n${html}\n</body>\n</html>`;
    document.getElementById('codigoHtml').value = completo;
}

export function salvarLocal() {
    mostrarCodigo();
    const data = {
        html: document.getElementById('codigoHtml').value,
        formFields,
        headerImgURL,
        menuImgURL,
    };
    localStorage.setItem('paginaHTML', JSON.stringify(data));
    alert("Html salvo com sucesso.");
}

export function carregarLocal() {
    const salvo = localStorage.getItem('paginaHTML');
    if (salvo) {
        const data = JSON.parse(salvo);
        document.getElementById('codigoHtml').value = data.html;
        if (data.formFields) formFields = data.formFields;
        if (data.headerImgURL) headerImgURL = data.headerImgURL;
        if (data.menuImgURL) menuImgURL = data.menuImgURL;

        document.getElementById('preview').innerHTML = data.html
            .replace(/^[\s\S]*<body>/i, '')
            .replace(/<\/body>[\s\S]*$/i, '');
        alert("Html carregado com sucesso.");
    }
}

export function limparLocal() {
    localStorage.removeItem('paginaHTML');
    document.getElementById('codigoHtml').value = '';
    formFields = [];
    document.getElementById('preview').innerHTML = '<p class="text-muted">Pré-visualização aparecerá aqui</p>';
}
