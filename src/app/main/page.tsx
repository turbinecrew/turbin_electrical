// src/app/trading/page.tsx
import React from 'react';

export async function getServerSideProps() {
  const API_URL =
    'http://apis.data.go.kr/B552115/PvAmountByLocHr?serviceKey=' +
    encodeURIComponent(process.env.NEXT_PUBLIC_API_KEY) +
    '&pageNo=1&numOfRows=10&dataType=JSON';

  const response = await fetch(API_URL);
  const data = await response.json();

  return { props: { data } };
}

const TradingPage = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>지역별 태양광 발전량</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TradingPage;
