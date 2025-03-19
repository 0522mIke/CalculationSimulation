"use client";

import React, { useState } from "react";
import IncomeCalculator from "@/components/IncomeCalculator";
import CostSimulator from "@/components/CostSimulator";
import PensionCalculator from "@/utils/PensionCalculator"; // 必要に応じて年金計算コンポーネント

export default function Home() {
  const [page, setPage] = useState<"income" | "cost" | "pension">("income");
  const [annualIncome, setAnnualIncome] = useState(3600000); // 初期値: 年収360万円（月30万）

  return (
    <div className="p-10 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4 mt-6">
      {/* ページ切り替えボタン */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded cursor-pointer transition transform shadow-md 
            ${page === "income" 
              ? "bg-blue-500 text-white hover:bg-blue-600 active:scale-95" 
              : "bg-gray-300 hover:bg-gray-400 active:scale-95"}`}
          onClick={() => setPage("income")}
        >
          年収計算
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer transition transform shadow-md 
            ${page === "cost" 
              ? "bg-blue-500 text-white hover:bg-blue-600 active:scale-95" 
              : "bg-gray-300 hover:bg-gray-400 active:scale-95"}`}
          onClick={() => setPage("cost")}
        >
          生活コスト
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer transition transform shadow-md 
            ${page === "pension" 
              ? "bg-blue-500 text-white hover:bg-blue-600 active:scale-95" 
              : "bg-gray-300 hover:bg-gray-400 active:scale-95"}`}
          onClick={() => setPage("pension")}
        >
          年金試算
        </button>
      </div>

      {/* 選択されたコンポーネントを表示 */}
      {page === "income" ? (
        <IncomeCalculator setAnnualIncome={setAnnualIncome} />
      ) : page === "cost" ? (
        <CostSimulator />
      ) : page === "pension" && (
        <div>
          <PensionCalculator annualIncome={annualIncome} />
        </div>
      )}
    </div>
  );
}
