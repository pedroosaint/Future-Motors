function salvarCalculo() {
  // Pega os valores dos inputs do Carro 1 e Carro 2
  const kmh1 = parseFloat(document.getElementById('kmh-1').value);
  const consumo1 = parseFloat(document.getElementById('consumo-1').value);
  const kmh2 = parseFloat(document.getElementById('kmh-2').value);
  const consumo2 = parseFloat(document.getElementById('consumo-2').value);

  // Pega os valores do simulador
  const distancia = parseFloat(document.getElementById('distância').value);
  const preco = parseFloat(document.getElementById('preço').value);

  // Validação simples
  if ([kmh1, consumo1, kmh2, consumo2, distancia, preco].some(isNaN)) {
    alert('Preencha todos os campos com números válidos.');
    return;
  }

  // Cálculos (consumo em kWh/100km)
  const eficiencia1 = 100 / consumo1; // km por kWh
  const eficiencia2 = 100 / consumo2;

  const custoPorKm1 = (consumo1 / 100) * preco;
  const custoPorKm2 = (consumo2 / 100) * preco;

  const custoTotal1 = custoPorKm1 * distancia;
  const custoTotal2 = custoPorKm2 * distancia;

  const diferenca = ((custoTotal2 - custoTotal1) / custoTotal1) * 100;

  // Categorização
  let resultado1, resultado2;
  if (custoTotal1 < custoTotal2) {
    resultado1 = 'Econômico';
    resultado2 = Math.abs(diferenca) >= 20 ? 'Não Compensa' : 'Não Econômico';
  } else {
    resultado2 = 'Econômico';
    resultado1 = Math.abs(diferenca) >= 20 ? 'Não Compensa' : 'Não Econômico';
  }

  exibirResultado({ eficiencia1, eficiencia2, custoTotal1, custoTotal2, resultado1, resultado2 });
}

function exibirResultado(d) {
  const secao = document.querySelector('.Resultados');
  secao.innerHTML = `
    <h3>Previsão de resultados</h3>
    <table>
      <tr><th></th><th>Carro 1</th><th>Carro 2</th></tr>
      <tr><td>Eficiência</td><td>${d.eficiencia1.toFixed(1)} km/kWh</td><td>${d.eficiencia2.toFixed(1)} km/kWh</td></tr>
      <tr><td>Custo total</td><td>R$ ${d.custoTotal1.toFixed(2)}</td><td>R$ ${d.custoTotal2.toFixed(2)}</td></tr>
      <tr><td>Classificação</td><td><strong>${d.resultado1}</strong></td><td><strong>${d.resultado2}</strong></td></tr>
    </table>
  `;
}