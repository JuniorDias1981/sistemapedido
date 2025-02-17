

function gerarResumo() {
    const sections = document.querySelectorAll('tbody[data-section]');
    let summaryItems = '';

    sections.forEach(section => {
        const sectionName = section.getAttribute('data-section');
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        let sectionContent = '';

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const row = checkbox.closest('tr');
                const produto = row.cells[1].textContent;
                const estoque = row.cells[2].querySelector('input').value || '0';
                const pedido = row.cells[3].querySelector('input').value || '0';
                sectionContent += `- ${produto} - Em Estoque: ${estoque}, Pedido: ${pedido}<br>`;
            }
        });

        if (sectionContent) {
            summaryItems += `<strong>${sectionName}</strong><br>${sectionContent}`;
        }
    });

    const observacao = document.getElementById('observacao').value;

    document.getElementById('summaryItems').innerHTML = summaryItems;
    document.getElementById('summaryObservation').textContent = observacao;
    document.getElementById('summaryModal').style.display = 'block';
}

function closeSummary() {
    document.getElementById('summaryModal').style.display = 'none';
}

function mostrarInputWhatsApp() {
    document.getElementById('whatsappModal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('whatsappModal').style.display = 'none';
}

function enviarPedido() {
    // Captura os 9 dígitos do número de WhatsApp
    const numeroWhatsApp = document.getElementById('whatsappNumber').value;

    // Valida se o número foi preenchido corretamente (somente 9 dígitos)
    const regex = /^\d{9}$/;
    if (!regex.test(numeroWhatsApp)) {
        alert('Por favor, insira um número válido com 9 dígitos');
        return;
    }

    // Monta o número completo, com o prefixo +55 22
    const numeroCompleto = `+5522${numeroWhatsApp}`;

    // Gera o resumo do pedido
    const sections = document.querySelectorAll('tbody[data-section]');
    let summaryItems = '';

    sections.forEach(section => {
        const sectionName = section.getAttribute('data-section');
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        let sectionContent = '';

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const row = checkbox.closest('tr');
                const produto = row.cells[1].textContent;
                const pedido = row.cells[3].querySelector('input').value || '0';
                sectionContent += `- ${produto} - Pedido: ${pedido}\n`;
            }
        });

        if (sectionContent) {
            summaryItems += `*${sectionName}*\n${sectionContent}`;
        }
    });

    const observacao = document.getElementById('observacao').value;
    const texto = `${summaryItems}\n*Observação:* ${observacao}`;

    // Cria o link para o WhatsApp com o número inserido
    const link = `https://api.whatsapp.com/send?phone=${numeroCompleto.replace(/\D/g, '')}&text=${encodeURIComponent(texto)}`;
    window.open(link, '_blank');

    // Fecha o modal
    fecharModal();
}


function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const titulo = "Resumo do Pedido";

    const sections = document.querySelectorAll('tbody[data-section]');
    let summaryItems = '';

    sections.forEach(section => {
        const sectionName = section.getAttribute('data-section');
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        let sectionContent = '';

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const row = checkbox.closest('tr');
                const produto = row.cells[1].textContent;
                const pedido = row.cells[3].querySelector('input').value || '0';
                sectionContent += `- ${produto} - Pedido: ${pedido}\n`;
            }
        });

        if (sectionContent) {
            summaryItems += `${sectionName}\n${sectionContent}`;
        }
    });

    const observacao = document.getElementById('observacao').value;

    doc.setFontSize(18);
    doc.text(titulo, 10, 10);
    doc.setFontSize(12);
    doc.text("Itens selecionados:", 10, 20);
    doc.text(summaryItems.split('\n'), 10, 30); // Divide o texto por linhas
    doc.text("Observação:", 10, 60);
    doc.text(observacao, 10, 70);

    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}-${mes}-${ano}`;
    const nomeArquivo = `resumo_pedido_Quatree-${dataFormatada}.pdf`;

    doc.save(nomeArquivo);
}

function gerarPDFCompleto() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const titulo = "Resumo Completo do Pedido";

    const sections = document.querySelectorAll('tbody[data-section]');
    let summaryItems = '';

    sections.forEach(section => {
        const sectionName = section.getAttribute('data-section');
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        let sectionContent = '';

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const row = checkbox.closest('tr');
                const produto = row.cells[1].textContent;
                const estoque = row.cells[2].querySelector('input').value || '0';
                const pedido = row.cells[3].querySelector('input').value || '0';
                sectionContent += `- ${produto} - Em Estoque: ${estoque}, Pedido: ${pedido}\n`;
            }
        });

        if (sectionContent) {
            summaryItems += `${sectionName}\n${sectionContent}`;
        }
    });

    const observacao = document.getElementById('observacao').value;

    doc.setFontSize(18);
    doc.text(titulo, 10, 10);
    doc.setFontSize(12);
    doc.text("Itens selecionados:", 10, 20);
    doc.text(summaryItems.split('\n'), 10, 30); // Divide o texto por linhas
    doc.text("Observação:", 10, 60);
    doc.text(observacao, 10, 70);

    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}-${mes}-${ano}`;
    const nomeArquivo = `resumo_completo_Quatree-${dataFormatada}.pdf`;

    doc.save(nomeArquivo);
}