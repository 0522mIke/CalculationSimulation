import { useState } from 'react';

  const CostSimulator = () => {
    //入力値の初期状態
  const [rent, setRent] = useState<number>(85000);
  const [food, setFood] = useState<number>(40000);
  const [utilities, setUtilities] = useState<number>(15000);
  const [communication, setCommunication] = useState<number>(7000);
  const [entertainment, setEntertainment] = useState<number>(20000);
  const [transportation, setTransportation] = useState<number>(12000);
  const [insurance, setInsurance] = useState<number>(15000);
  const [savings, setSavings] = useState<number>(50000);
  const [other, setOther] = useState<number>(50000);

    //生活費の合計
    const totalCost = rent + food + utilities + communication + entertainment + transportation + insurance + savings + other;

     return (
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-none space-y-4 mt-6">
        <h2 className="text-2xl font-bold text-center">生活コストシュミレーション</h2><br />
           <p>1ヶ月の生活費をシミュレーションして、目標の月収をチェック!<br />
              ※参考のため平均的な初期値を入力済です。必要に応じて変更してください。
                </p>
        
        {/* 家賃入力 */}
      <div>
      <div className="mt-4">
        <label>家賃：</label>
      <input type="number" value={rent} onChange={(e) => setRent(Number(e.target.value))} 
        className="border p-2 w-full" /></div>
      {/* 食費入力 */}
      <div className="mt-4">
        <label>食費：</label>
        <input type="number" value={food} onChange={(e) => setFood(Number(e.target.value))} className="border p-2 w-full" /></div>
      {/* 光熱費入力 */}
      <div className="mt-4">
        <label>光熱費：</label>
        <input type="number" value={utilities} onChange={(e) => setUtilities(Number(e.target.value))} className="border p-2 w-full" /></div>
      {/* 通信費入力 */}
      <div className="mt-4">
        <label>通信費：</label>
        <input type="number" value={communication} onChange={(e) => setCommunication(Number(e.target.value))} className="border p-2 w-full" /></div>
      {/* 娯楽費入力 */}
      <div className="mt-4">
        <label>娯楽費：</label>
        <input type="number" value={entertainment} onChange={(e) => setEntertainment(Number(e.target.value))} className="border p-2 w-full" /></div>
      {/* 交通費入力 */}
      <div className="mt-4">
        <label>交通費：</label>
        <input type="number" value={transportation} onChange={(e) => setTransportation(Number(e.target.value))} className="border p-2 w-full" /></div>
      {/* 貯金入力 */}
      <div className="mt-4">
        <label>貯金：</label>
        <input type="number" value={savings} onChange={(e) => setSavings(Number(e.target.value))} className="border p-2 w-full" /></div>
        {/* 保険入力 */}
       <div className="mt-4">
       <label className="block">保険：</label>
        <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} 
      className="border p-2 w-full" /></div>
      {/* その他入力 */}
      <div className="mt-4">
        <label>その他：</label>
        <input type="number" value={other} onChange={(e) => setOther(Number(e.target.value))} className="border p-2 w-full" /></div>
      {/* 合計表示 */}
      <div className="mt-4">
        <p>毎月の生活費合計: <b>{totalCost.toLocaleString()} 円</b></p>
      </div>
      </div>
      </div>
     );
};
export default CostSimulator;
