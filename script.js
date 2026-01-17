window.onload = function() {
    lucide.createIcons();
    const grid = document.getElementById('rifa-grid');
    const soldLabel = document.getElementById('sold-info');
    const modal = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    let rifaData = JSON.parse(localStorage.getItem('rifaMJ')) || {};
    let numAtivo = null;

    function render() {
        grid.innerHTML = '';
        let count = 0;
        for (let i = 1; i <= 200; i++) {
            const div = document.createElement('div');
            div.className = `num-card ${rifaData[i] ? 'vendido' : ''}`;
            div.innerText = i;
            div.onclick = () => openModal(i);
            grid.appendChild(div);
            if (rifaData[i]) count++;
        }
        soldLabel.innerText = `Vendidos: ${count}/200`;
    }

    function openModal(num) {
        numAtivo = num;
        document.getElementById('modal-title').innerText = `Número ${num}`;
        if (rifaData[num]) {
            modalBody.innerHTML = `
                <div style="color:#166534; font-weight:bold; margin-bottom:10px;">✓ Reservado</div>
                <p><strong>Nome:</strong> ${rifaData[num].nome}</p>
                <p><strong>Tel:</strong> ${rifaData[num].telefone || 'N/A'}</p>
                <button id="btn-release" class="btn-release">Liberar Número</button>`;
            document.getElementById('btn-release').onclick = release;
        } else {
            modalBody.innerHTML = `
                <input type="text" id="in-name" placeholder="Nome do Comprador">
                <input type="tel" id="in-tel" placeholder="Telefone (Opcional)">
                <button id="btn-save" class="btn-confirm">Confirmar Reserva</button>`;
            document.getElementById('btn-save').onclick = save;
        }
        modal.style.display = 'flex';
    }

    function save() {
        const nome = document.getElementById('in-name').value;
        const tel = document.getElementById('in-tel').value;
        if (!nome.trim()) return alert('Digite o nome');
        rifaData[numAtivo] = { nome: nome.trim(), telefone: tel.trim() };
        finish();
    }

    function release() {
        if (confirm('Liberar número?')) { delete rifaData[numAtivo]; finish(); }
    }

    function finish() {
        localStorage.setItem('rifaMJ', JSON.stringify(rifaData));
        modal.style.display = 'none';
        render();
    }

    document.getElementById('reset-btn').onclick = () => {
        if (confirm('Resetar toda a rifa?')) { rifaData = {}; finish(); }
    };
    document.getElementById('close-modal').onclick = () => modal.style.display = 'none';
    render();
};

