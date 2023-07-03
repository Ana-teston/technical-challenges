import React, { useEffect, useState, useRef } from 'react';
import ApexCharts from 'apexcharts';
import {
    Container,
    ChartCard,
    ChartContainer,
    ChartTitle,
    MenuButtonContainer,
    MenuIcon,
} from './donut-chart-card.styles';

const DonutChartCard = () => {
    const [chartData, setChartData] = useState(null);
    const chartRefs = useRef([]);

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
        if (chartData) {
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
                                plotOptions: {
                                    pie: {
                                        donut: {
                                            labels: {
                                                show: true,
                                                total: {
                                                    show: true,
                                                    label: 'Total',
                                                    formatter: (value) => {
                                                        const total = numbers.reduce(
                                                            (acc, curr) => acc + curr,
                                                            0
                                                        );
                                                        return `${total} users`;
                                                    },
                                                },
                                            },
                                        },
                                    },
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

    const chartContainerRefs = useRef([]);
    const cloneStatusRefs = useRef([]);

    const handleClone = (index) => {
        if (!cloneStatusRefs.current[index]) {
            cloneStatusRefs.current[index] = true;

            const newChartData = { ...chartData };
            const newProfiles = [...newChartData.profiles];
            const clonedProfile = { ...newProfiles[index] };
            newProfiles.push(clonedProfile);
            newChartData.profiles = newProfiles;
            setChartData(newChartData);
        }
    };

    return (
        <Container>
            {chartData &&
                chartData.profiles.map((profile, index) => (
                    <ChartCard key={index}>
                        <ChartTitle>{profile.title}</ChartTitle>
                        <ChartContainer ref={(el) => (chartContainerRefs.current[index] = el)} />
                        <MenuButtonContainer>
                            {!cloneStatusRefs.current[index] && (
                                <button onClick={() => handleClone(index)}>
                                    <MenuIcon>&#8942;</MenuIcon>
                                </button>
                            )}
                        </MenuButtonContainer>
                    </ChartCard>
                ))}
        </Container>
    );
};

export default DonutChartCard;
