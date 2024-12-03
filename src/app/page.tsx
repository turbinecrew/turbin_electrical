"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = "/api/proxy"; // Next.js API Route 호출
      try {
        const response = await axios.get(API_URL);
        const items = response?.data?.response?.body?.items?.item;
        if (items) {
          setData(items);
        } else {
          setError("API에서 유효한 데이터를 가져오지 못했습니다.");
        }
      } catch (err) {
        console.error("API 호출 오류:", err);
        setError("네트워크 또는 API 호출 중 문제가 발생했습니다.");
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data?.map((item: any) => `${item.tradeNo}시`) || [],
    datasets: [
      {
        label: "태양광 발전량 (MWh)",
        data: data?.map((item: any) => item.amgo) || [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "지역별 태양광 발전량 데이터",
      },
    },
  };

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f7f7f7" }}>
      <h1>VPP 대시보드</h1>
      {data ? <Line data={chartData} options={chartOptions} /> : <div>로딩 중...</div>}
    </div>
  );
};

export default Dashboard;
