import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

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

const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
];

const ProblemCountComponent: React.FC<Props> = () => {
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentMonthProblemCount, setCurrentMonthProblemCount] = useState<number>(0);
    const [totalProblemCount, setTotalProblemCount] = useState<number>(0);
    const [percentageChange, setPercentageChange] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lid = localStorage.getItem("rid");
                const response = await axios.get(`http://localhost:4000/api/user/problem/?lid=${lid}`);
                const problemData: Problem[] = response.data;

                const currentMonthProblems = problemData.filter((problem) => {
                    const problemMonth = new Date(problem.datetime).getMonth();
                    return problemMonth === currentMonth;
                });

                const currentMonthCount = currentMonthProblems.length;
                setCurrentMonthProblemCount(currentMonthCount);

                const totalCount = problemData.length;
                setTotalProblemCount(totalCount);

                const previousMonth = currentMonth - 1 >= 0 ? currentMonth - 1 : 11;
                const previousMonthProblems = problemData.filter((problem) => {
                    const problemMonth = new Date(problem.datetime).getMonth();
                    return problemMonth === previousMonth;
                });

                const previousMonthCount = previousMonthProblems.length;

                const percentage =
                    previousMonthCount !== 0
                        ? ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100
                        : 0;
                setPercentageChange(percentage);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentMonth]);

    const handlePreviousMonth = () => {
        const previousMonth = currentMonth - 1 >= 0 ? currentMonth - 1 : 11;
        setCurrentMonth(previousMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = currentMonth + 1 <= 11 ? currentMonth + 1 : 0;
        setCurrentMonth(nextMonth);
    };

    const getIcon = () => {
        if (percentageChange > 0) {
            return <span className={styles.icon}>&#9650;</span>; // ไอคอนเพิ่มขึ้น (↑)
        } else if (percentageChange < 0) {
            return <span className={styles.icon}>&#9660;</span>; // ไอคอนลดลง (↓)
        } else {
            return null; // ไม่แสดงไอคอนเมื่อไม่มีการเปลี่ยนแปลง
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardItem} style={{ textAlign: "center" }}>
            <div className={styles.monthSelector}>
                <button className={styles.monthButton} onClick={handlePreviousMonth}>&lt;</button>
                <p className={styles.monthName}>{monthNames[currentMonth]}</p>
                <button className={styles.monthButton} onClick={handleNextMonth}>&gt;</button>
            </div>
                <p className={styles.dashboardItemLabel}>จำนวนปัญหาในเดือนปัจจุบัน</p>
                <p className={styles.dashboardItemValue}>{currentMonthProblemCount} ปัญหา</p>
                <p className={styles.dashboardItemLabel}>เปอร์เซ็นต์การเปลี่ยนแปลงจากเดือนก่อนหน้า</p>
                <p className={styles.dashboardItemValue}>   
                    {getIcon()}
                    {Math.abs(percentageChange).toFixed(2)}%
                </p>
            </div>
            
        </div>
    );
};

export default ProblemCountComponent;
