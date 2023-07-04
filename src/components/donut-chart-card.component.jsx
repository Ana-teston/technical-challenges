import React, { useEffect, useState, useRef } from 'react';
import ApexCharts from 'apexcharts';
import './donut-chart-card.styles.css';

const DonutChartCard = () => {
    const [chartData, setChartData] = useState(null);
    const chartContainerRefs = useRef([]);
    const cloneStatusRefs = useRef([]);
    const chartRefs = useRef([]); // Add this line

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/data.json');
                const data = await response.json();
                setChartData(data);
            } catch (e) {
                console.log('error fetching data', e);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartData && chartData.profiles) {
            chartData.profiles.forEach((profile, index) => {
                const numbers = [];
                const labels = [];

                profile.data.forEach((item) => {
                    labels.push(item.label);
                    numbers.push(item.value);
                });

                const chartOptions = {
                    series: numbers,
                    labels: labels,
                    chart: {
                        type: 'donut',
                        animations: {
                            enabled: false,
                        },
                    },
                    dataLabels: {
                        enabled: true,
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                },
                            },
                        },
                    },
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                };

                if (chartRefs.current[index]) {
                    chartRefs.current[index].updateOptions(chartOptions);
                } else {
                    chartRefs.current[index] = new ApexCharts(
                        chartContainerRefs.current[index],
                        chartOptions
                    );
                    chartRefs.current[index].render();
                }
            });
        }
    }, [chartData]);


    const handleClone = (index) => {
        if (!cloneStatusRefs.current[index]) {
            cloneStatusRefs.current[index] = true;

            const newChartData = { ...chartData };
            const newProfiles = [...newChartData.profiles];
            const clonedProfile = { ...newProfiles[index], cloneButton: false };
            newProfiles.push(clonedProfile);
            newChartData.profiles = newProfiles;
            setChartData(newChartData);
        }
    };

    return (
        <div className="container">
            {chartData &&
                chartData.profiles.map((profile, index) => (
                    <div className="chart-card" key={index}>
                        <h2 className="chart-title">{profile.title}</h2>
                        <div
                            className="chart-container"
                            ref={(el) => (chartContainerRefs.current[index] = el)}
                        ></div>
                        <div className="menu-button-container">
                            {!cloneStatusRefs.current[index] && (
                                <button onClick={() => handleClone(index)}>
                                    <span className="menu-icon">&#8942;</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default DonutChartCard;
