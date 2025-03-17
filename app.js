// Här är de hårdkodade aktiekurserna för åren 2021 till 2024
const years = ["2021", "2022", "2023", "2024"];
const prices = [2945, 3600, 5290, 9103]; // Aktiekurser för varje år

// Funktion för att skapa grafen
function plotChart() {
    const ctx = document.getElementById('stockChart').getContext('2d');

    new Chart(ctx, {
        type: 'line', // Linjegraf
        data: {
            labels: years, // X-axel (år)
            datasets: [{
                label: 'Aktiekurs (SEK)',
                data: prices, // Y-axel (pris per aktie)
                borderColor: 'rgba(75, 192, 192, 1)', // Linjens färg
                fill: false, // Fyll inte under linjen
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'År'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Pris (SEK)'
                    }
                }
            }
        }
    });
}

// Funktion för att beräkna totalt investerat och vinst
function calculateInvestment() {
    const purchases2021 = parseInt(document.getElementById('purchases2021').value) || 0;
    const purchases2022 = parseInt(document.getElementById('purchases2022').value) || 0;
    const purchases2023 = parseInt(document.getElementById('purchases2023').value) || 0;
    const purchases2024 = parseInt(document.getElementById('purchases2024').value) || 0;

    const investment2021 = purchases2021 * prices[0];
    const investment2022 = purchases2022 * prices[1];
    const investment2023 = purchases2023 * prices[2];
    const investment2024 = purchases2024 * prices[3];

    const totalInvested = investment2021 + investment2022 + investment2023 + investment2024;

    // Beräkna den totala vinstsumman
    const totalShares = purchases2021 + purchases2022 + purchases2023 + purchases2024;
    const totalValue = (purchases2021 * prices[0]) + (purchases2022 * prices[1]) + (purchases2023 * prices[2]) + (purchases2024 * prices[3]);

    const totalProfit = totalValue - totalInvested;

    // Visa resultatet
    document.getElementById('investmentResult').innerHTML = `
        Totalt Investera: ${totalInvested.toFixed(2)} SEK <br>
        Totalt Vinst: ${totalProfit.toFixed(2)} SEK <br>
        Totalt sammanfogat värde: ${totalValue.toFixed(2)} SEK
    `;
}

// Kör funktionen för att visa grafen
plotChart();
