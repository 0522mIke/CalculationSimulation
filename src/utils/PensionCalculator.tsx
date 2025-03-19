import React from 'react';

const PensionCalculator = () => {
  // 基本設定
  const employeeAnnualIncome = 3600000;
  const employeePensionRate = 0.183 / 2;
  const freelanceMonthlyPension = 16980;

  // 1. 企業40年分の年金支払い総額
  const employeePensionPerYear = Math.floor(employeeAnnualIncome * employeePensionRate);
  const totalEmployeePensionFor40Years = Math.floor(employeePensionPerYear * 40);

  // 2. 企業20年 + フリーランス20年分の年金支払い総額
  const totalEmployeePensionFor20Years = Math.floor(employeePensionPerYear * 20);
  const totalFreelancePensionFor20Years = Math.floor(freelanceMonthlyPension * 12 * 20);
  const totalPensionFor20YearsEmployeeAndFreelance = totalEmployeePensionFor20Years + totalFreelancePensionFor20Years;

  // 3. フリーランス40年分の年金支払い総額
  const totalFreelancePensionFor40Years = Math.floor(freelanceMonthlyPension * 12 * 40);

  // 年金受給額の概算（年収ごとに計算）
  const getEmployeeMonthlyPension = (annualIncome: number) => {
    if (annualIncome <= 3500000) return 130000; 
    if (annualIncome <= 4500000) return 147000; 
    if (annualIncome <= 5500000) return 165000; 
    return 180000;
  };

  // 会社員の年金受給額（例：年収360万円の場合）
  const estimatedEmployeeMonthlyPension = getEmployeeMonthlyPension(employeeAnnualIncome);
  
  // フリーランスの年金受給額（一定金額）
  const estimatedFreelanceMonthlyPension = 68000;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-none space-y-4 mt-6">
      <h2 className="text-2xl font-bold text-center">年金シュミレーション</h2><br />

      <h3>年金支払い総額（概算）</h3>

      {/* 1. 企業40年勤務 */}
      <p>会社員40年【厚生年金】(年収360万円として)：　 ¥{totalEmployeePensionFor40Years.toLocaleString()}</p>

      {/* 2. 企業20年 + フリーランス20年 */}
      <p>会社員20年 + フリーランス20年：　¥{totalPensionFor20YearsEmployeeAndFreelance.toLocaleString()}</p>

      {/* 3. フリーランス40年勤務 */}
      <p>フリーランス40年【国保】：　¥{totalFreelancePensionFor40Years.toLocaleString()}</p>
      <br></br>
              
      <br></br>
      <h3>年収別会社員の年金受給額（月平均）</h3>
      <ul>
        <li>年収350万円の場合: ¥130,000</li>
        <li>年収450万円の場合: ¥147,000</li>
        <li>年収550万円の場合: ¥165,000</li>
        <li>年収600万円の場合: ¥180,000</li>
      </ul>
      <br></br>
      <h3>フリーランスの国民年金受給額（月平均）: ¥{estimatedFreelanceMonthlyPension.toLocaleString()}</h3>
      <br />
      <hr />
          <p className="text-sm text-gray-500">
            会社員とフリーランスでは、支払い総額も年金受給額にも大きな差があります。<br />
             会社員は60歳から75歳までの15年間で約2520万円（月平均：約14万円）を受け取りますが、<br />
            フリーランスは約1224万円（月々約6.8万円）と、受給額は会社員の約半分となります。<br />
            長期的に見ると、会社員の方が安定した老後を送ることができると感じました。
          </p>

    </div>

  );
};


export default PensionCalculator;
