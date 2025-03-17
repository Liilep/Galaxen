// Här är de hårdkodade aktiekurserna för åren 2021 till 2024
const years = ["2021", "2022", "2023", "2024"];
const prices = [2945, 3600, 5290, 9103]; // Aktiekurser för varje år

// Funktion för att skapa grafer för aktiekurs och vinst
function plotCharts() {
    const ctx1 = document.getElementById('stockChart').getContext('2d');
    const ctx2 = document.getElementById('profitChart').getContext('2d');

    new Chart(ctx1, {
        type: 'line', // Linjegraf för aktiekurs
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

    // Graf för vinsten
    new Chart(ctx2, {
        type: 'line', // Linjegraf för vinst
        data: {
            labels: years, // X-axel (år)
            datasets: [{
                label: 'Vinst (SEK)',
                data: [], // Detta kommer att uppdateras dynamiskt
                borderColor: 'rgba(255, 99, 132, 1)', // Linjens färg för vinsten
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
                        text: 'Vinst (SEK)'
                    }
                }
            }
        }
    });
}

// Funktion för att beräkna totalt investerat och vinst samt uppdatera grafen
function calculateInvestment() {
    const purchases2021 = parseInt(document.getElementById('purchases2021').value) || 0;
    const purchases2022 = parseInt(document.getElementById('purchases2022').value) || 0;
    const purchases2023 = parseInt(document.getElementById('purchases2023').value) || 0;
    const purchases2024 = parseInt(document.getElementById('purchases2024').value) || 0;

    // Beräkning av investeringarna baserat på antal aktier och priserna för varje år
    const investment2021 = purchases2021 * prices[0];
    const investment2022 = purchases2022 * prices[1];
    const investment2023 = purchases2023 * prices[2];
    const investment2024 = purchases2024 * prices[3];

    // Totalt investerat belopp
    const totalInvested = investment2021 + investment2022 + investment2023 + investment2024;

    // Totalt värde vid 2024 års aktiekurs
    const totalShares = purchases2021 + purchases2022 + purchases2023 + purchases2024;
    const totalValue = totalShares * prices[3]; // Totalt värde baserat på 2024 års aktiekurs

    // Vinsten beräknas genom att subtrahera den totala investeringen från det totala värdet
    const totalProfit = totalValue - totalInvested;

    // Visa resultatet
    document.getElementById('investmentResult').innerHTML = `
        Totalt Investera: ${totalInvested.toFixed(2)} SEK <br>
        Totalt Vinst: ${totalProfit.toFixed(2)} SEK <br>
        Totalt sammanfogat värde: ${totalValue.toFixed(2)} SEK
    `;

    // Beräkna vinsten för varje år och uppdatera grafen
    const yearlyProfit = [
        (prices[0] * purchases2021) - investment2021,
        (prices[1] * purchases2022) - investment2022,
        (prices[2] * purchases2023) - investment2023,
        totalProfit // Total vinst för 2024
    ];

    // Uppdatera vinstgrafen med vinster för varje år
    updateProfitChart(yearlyProfit);
}

// Funktion för att uppdatera vinstgrafen
function updateProfitChart(profitData) {
    const profitChart = Chart.instances[1];
    profitChart.data.datasets[0].data = profitData;
    profitChart.update();
}

// Kör funktionen för att visa graferna
plotCharts();
