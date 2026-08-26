function salvarCalculo() {
    const capacidade1 = parseFloat(document.getElementById('capacidade-1').value);
    const consumo1 = parseFloat(document.getElementById('consumo-1').value);
    const capacidade2 = parseFloat(document.getElementById('capacidade-2').value);
    const consumo2 = parseFloat(document.getElementById('consumo-2').value);
    const distancia = parseFloat(document.getElementById('distância').value);
    const preco = parseFloat(document.getElementById('preço').value);

    if (
        [capacidade1, consumo1, capacidade2, consumo2, distancia, preco].some(isNaN) ||
        capacidade1 <= 0 ||
        consumo1 <= 0 ||
        capacidade2 <= 0 ||
        consumo2 <= 0 ||
        distancia <= 0 ||
        preco < 0
    ) {
        alert('Preencha todos os campos com números válidos.');
        return;
    }

    const eficiencia1 = 100 / consumo1;
    const eficiencia2 = 100 / consumo2;

    const autonomia1 = (capacidade1 / consumo1) * 100;
    const autonomia2 = (capacidade2 / consumo2) * 100;

    const custoPorKm1 = (consumo1 / 100) * preco;
    const custoPorKm2 = (consumo2 / 100) * preco;

    const custoTotal1 = custoPorKm1 * distancia;
    const custoTotal2 = custoPorKm2 * distancia;

    const diferencaCusto = Math.abs(custoTotal1 - custoTotal2);
    const maiorCusto = Math.max(custoTotal1, custoTotal2);

    const diferencaPercentual =
        maiorCusto === 0 ? 0 : (diferencaCusto / maiorCusto) * 100;

    let resultado1;
    let resultado2;
    let carroEconomico;

    if (custoTotal1 < custoTotal2) {
        resultado1 = 'Econômico';
        resultado2 = 'Não Econômico';
        carroEconomico = 'Carro 1';
    } else if (custoTotal2 < custoTotal1) {
        resultado1 = 'Não Econômico';
        resultado2 = 'Econômico';
        carroEconomico = 'Carro 2';
    } else {
        resultado1 = 'Empate';
        resultado2 = 'Empate';
        carroEconomico = 'Empate';
    }

    exibirResultado({
        eficiencia1,
        eficiencia2,
        autonomia1,
        autonomia2,
        custoTotal1,
        custoTotal2,
        diferencaCusto,
        diferencaPercentual,
        resultado1,
        resultado2,
        carroEconomico
    });
}

function exibirResultado(d) {
    const container = document.getElementById('resultados-cards');

    const selo = (resultado) => {
        if (resultado === 'Econômico') {
            return 'selo-economico';
        }

        if (resultado === 'Não Econômico') {
            return 'selo-nao-economico';
        }

        if (resultado === 'Empate') {
            return 'selo-empate';
        }

        return 'selo-nao-compensa';
    };

    container.innerHTML = `
        <div class="resultado-card">
            <h4>Carro 1</h4>

            <div class="resultado-linha">
                <span>Eficiência</span>
                <span>${d.eficiencia1.toFixed(2)} km/kWh</span>
            </div>

            <div class="resultado-linha">
                <span>Autonomia</span>
                <span>${d.autonomia1.toFixed(2)} km</span>
            </div>

            <div class="resultado-linha">
                <span>Custo total</span>
                <span>R$ ${d.custoTotal1.toFixed(2)}</span>
            </div>

            <div class="resultado-selo ${selo(d.resultado1)}">
                ${d.resultado1}
            </div>
        </div>

        <div class="resultado-card">
            <h4>Carro 2</h4>

            <div class="resultado-linha">
                <span>Eficiência</span>
                <span>${d.eficiencia2.toFixed(2)} km/kWh</span>
            </div>

            <div class="resultado-linha">
                <span>Autonomia</span>
                <span>${d.autonomia2.toFixed(2)} km</span>
            </div>

            <div class="resultado-linha">
                <span>Custo total</span>
                <span>R$ ${d.custoTotal2.toFixed(2)}</span>
            </div>

            <div class="resultado-selo ${selo(d.resultado2)}">
                ${d.resultado2}
            </div>
        </div>

        <div class="resultado-card">
            <h4>Comparação final</h4>

            <div class="resultado-linha">
                <span>Mais econômico</span>
                <span>${d.carroEconomico}</span>
            </div>

            <div class="resultado-linha">
                <span>Diferença de custo</span>
                <span>R$ ${d.diferencaCusto.toFixed(2)}</span>
            </div>

            <div class="resultado-linha">
                <span>Variação</span>
                <span>${d.diferencaPercentual.toFixed(2)}%</span>
            </div>
        </div>
    `;
}