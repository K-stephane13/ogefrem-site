document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('fretChart')?.getContext('2d');
    if (ctx) {
        fetch('assets/data/statistiques.json')
            .then(response => response.json())
            .then(data => {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.volumes_fret.labels,
                        datasets: [{
                            label: 'Volumes de fret (tonnes)',
                            data: data.volumes_fret.values,
                            borderColor: '#003399',
                            backgroundColor: 'rgba(0, 51, 153, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#FFCC00',
                            pointBorderColor: '#003399',
                            pointRadius: 5,
                            pointHoverRadius: 8
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Tonnes'
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Erreur chargement stats:', error));
    }
});