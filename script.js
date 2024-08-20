document.getElementById('poissonForm').addEventListener('submit', function(event){
    event.preventDefault();

    const kejadian = parseInt(document.getElementById('kejadian').value);
    const lambda = parseFloat(document.getElementById('lambda').value);

    const { lambdaPangkatK, ePangkatMinusLambda, faktorialK, hasilPerkalian, hasilFinal } = calculatePoisson(kejadian, lambda);
    
    document.getElementById('result').innerText = `Probabilitas kejadian = ${hasilFinal.toFixed(6)}`;
    document.getElementById('lambdaPangkatK').innerText = `λ^k = ${lambdaPangkatK.toFixed(6)}`;
    document.getElementById('ePangkatMinusLambda').innerText = `e^-λ = ${ePangkatMinusLambda.toFixed(6)}`;
    document.getElementById('faktorialK').innerText = `k! = ${faktorialK.toFixed(6)}`;
    document.getElementById('hasilPerkalian').innerText = `${lambdaPangkatK.toFixed(6)} * ${ePangkatMinusLambda.toFixed(6)} = ${hasilPerkalian.toFixed(6)}`;
    document.getElementById('hasilFinal').innerText = `${hasilPerkalian.toFixed(6)} / ${faktorialK} = ${hasilFinal.toFixed(6)}`;    
    
    generatePoissonTable(lambda);
});

function factorial(n){
    let result = 1;
    for(let i = 1; i<=n;i++){
        result *= i;
    }
    return result;
}

function calculatePoisson(k, lambda){
    const e = Math.E;
    const lambdaPangkatK = Math.pow(lambda, k);
    const ePangkatMinusLambda = Math.pow(e,-lambda); 
    const faktorialK = factorial(k);
    const hasilPerkalian = lambdaPangkatK * ePangkatMinusLambda;
    const hasilFinal = hasilPerkalian / faktorialK;
    return {lambdaPangkatK, ePangkatMinusLambda, faktorialK, hasilPerkalian, hasilFinal};
}

function generatePoissonTable(lambda){
    const tableBody = document.querySelector('#poissonTable tbody');
    tableBody.innerHTML = ''; //untuk Clear table sebelumnya

    let cumulative = 0;
    for(let k = 0; k<=5; k++){
        const { hasilFinal } = calculatePoisson(k, lambda);
        cumulative += hasilFinal;

        const row = document.createElement('tr');
        const kCell = document.createElement('td');
        const probabilitasCell = document.createElement('td');
        const cumulativeCell = document.createElement('td');

        kCell.textContent = k;
        probabilitasCell.textContent = hasilFinal.toFixed(6);
        cumulativeCell.textContent = cumulative.toFixed(6);

        row.appendChild(kCell);
        row.appendChild(probabilitasCell);
        row.appendChild(cumulativeCell);

        tableBody.appendChild(row);
    }
}