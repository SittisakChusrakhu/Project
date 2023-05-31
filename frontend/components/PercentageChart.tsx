import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Chart } from "chart.js";

interface Props { }

interface Problem {
    id: string;
    pro_title: string;
    pro_type: string;
    pro_desc: string;
    pro_image: string;
    lect_id: string;
    sid: string;
    datetime: string;
    course: string;
    status: string;
}

const ChartComponent: React.FC<Props> = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"pie", number[], string> | null>(null);
    const [data, setData] = useState<{
        successPercentage: number;
        rejectedPercentage: number;
        sendingPercentage: number;
    }>({
        successPercentage: 0,
        rejectedPercentage: 0,
        sendingPercentage: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lid = localStorage.getItem("rid");
                const response = await axios.get(`http://localhost:4000/api/user/problem/?lid=${lid}`);
                const problemData: Problem[] = response.data;

                const successCount = problemData.filter((problem: Problem) => problem.status === "ได้รับการแก้ปัญหาแล้ว").length;
                const rejectedCount = problemData.filter((problem: Problem) => problem.status === "การแจ้งปัญหาถูกปฏิเสธ").length;
                const sendingCount = problemData.filter((problem: Problem) => problem.status === "กำลังส่งเรื่อง").length;

                const totalCount = successCount + rejectedCount + sendingCount;
                const successPercentage = (successCount / totalCount) * 100;
                const rejectedPercentage = (rejectedCount / totalCount) * 100;
                const sendingPercentage = (sendingCount / totalCount) * 100;

                setData({
                    successPercentage,
                    rejectedPercentage,
                    sendingPercentage,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
                chartInstance.current = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: ["ได้รับการแก้ปัญหาแล้ว", "กำลังส่งเรื่อง", "การแจ้งปัญหาถูกปฏิเสธ"],
                        datasets: [
                            {
                                data: [
                                    data.successPercentage,
                                    data.sendingPercentage,
                                    data.rejectedPercentage,
                                ],
                                backgroundColor: [
                                    "RGBA( 144, 238, 144, 0.2 )",
                                    "rgba(255, 255, 0, 0.2)",
                                    "rgba(255, 99, 132, 0.2)",
                                ],
                                borderColor: [
                                    "RGBA( 144, 238, 144, 1 )",
                                    "rgba(255, 255, 0, 1)",
                                    "rgba(255, 99, 132, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (context: any) => {
                                        const labelIndex = context.dataIndex;
                                        const percentage = (() => {
                                            if (labelIndex === 0) {
                                                return data.successPercentage.toFixed(2);
                                            } else if (labelIndex === 1) {
                                                return data.sendingPercentage.toFixed(2);
                                            } else if (labelIndex === 2) {
                                                return data.rejectedPercentage.toFixed(2);
                                            }
                                            return "";
                                        })();
                                        return `${context.label}: ${percentage}%`;
                                    },
                                    afterLabel: (tooltipItem: any) => {
                                        return `Align: left`;
                                    },
                                },
                            },
                        },
                    },
                });                   
            }
        }
    }, [data.successPercentage, data.sendingPercentage, data.rejectedPercentage]);

    return (
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default ChartComponent;    