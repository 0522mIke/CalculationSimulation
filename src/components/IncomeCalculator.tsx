import { useState, useEffect } from "react";

type IncomeCalculatorProps = {
  setAnnualIncome: React.Dispatch<React.SetStateAction<number>>;
};

export default function IncomeCalculator({ setAnnualIncome }: IncomeCalculatorProps) {
  const [salary, setSalary] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [isFreelancer, setIsFreelancer] = useState<boolean>(false);

  // 年収の計算関数
  const calculateAnnualIncome = (salary: number, bonus: number, isMonthly: boolean) => {
    return isMonthly ? salary * 12 + bonus : salary + bonus;
  };

  // 年収を計算して、setAnnualIncome を呼び出し
  useEffect(() => {
    const calculatedAnnualIncome = calculateAnnualIncome(salary, bonus, isMonthly);
    setAnnualIncome(calculatedAnnualIncome);  // 年収をセット
  }, [salary, bonus, isMonthly, setAnnualIncome]);  // 必要な依存関係を追加

  const annualIncome = salary * 12 + bonus;

  // 会社員の場合
const healthInsurance = annualIncome * 0.05;
const pension = (annualIncome * 0.183) / 2;
const employmentInsurance = annualIncome * 0.006;
const residentTax = annualIncome * 0.10;

// 所得税の計算（会社員）
let taxableIncome = annualIncome - (healthInsurance + pension + employmentInsurance);
let incomeTax = 0;

if (taxableIncome <= 1950000) {
  incomeTax = taxableIncome * 0.05;  // 195万円以下：5%
} else if (taxableIncome <= 3300000) {
  incomeTax = 1950000 * 0.05 + (taxableIncome - 1950000) * 0.1;  // 195万円超～330万円以下：10%
} else {
  incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (taxableIncome - 3300000) * 0.2;  // 330万円超：20%
}

// 会社員の手取り額
const netIncome = annualIncome - (healthInsurance + pension + employmentInsurance + incomeTax + residentTax);


// フリーランスの場合
const freelanceHealthInsurance = annualIncome * 0.14;
const freelancePension = 16980 * 12;
const freelanceTaxableIncome = Math.max(annualIncome - freelancePension, 0);

// 所得税の計算（フリーランス）
let freelanceIncomeTax = 0;

if (freelanceTaxableIncome <= 1950000) {
  freelanceIncomeTax = freelanceTaxableIncome * 0.05;  // 195万円以下：5%
} else if (freelanceTaxableIncome <= 3300000) {
  freelanceIncomeTax = 1950000 * 0.05 + (freelanceTaxableIncome - 1950000) * 0.1;  // 195万円超～330万円以下：10%
} else {
  freelanceIncomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (freelanceTaxableIncome - 3300000) * 0.2;  // 330万円超：20%
}

// フリーランスの手取り額
const freelanceResidentTax = annualIncome * 0.10;
const freelanceNetIncome = annualIncome - (freelanceHealthInsurance + freelancePension + freelanceIncomeTax + freelanceResidentTax);


  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-none space-y-4 mt-6">
      <h2 className="text-2xl font-bold text-center">手取り計算ツール</h2><br />

      <div className="mt-4">
        <label className="block font-medium">給与（{isMonthly ? "月収" : "年収"}）</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">ボーナス（年間合計）</label>
        <input
          type="number"
          value={bonus}
          onChange={(e) => setBonus(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={isMonthly}
          onChange={() => setIsMonthly(!isMonthly)}
          className="mr-2"
        />
        <label>月収入力にする</label>
      </div>

      <div className="flex items-center mt-4">
        <input type="checkbox" checked={isFreelancer} onChange={() => setIsFreelancer(!isFreelancer)} className="mr-2" />
        <label>個人事業主・フリーランスとして計算（課税所得を入力）</label>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>年収: <b>{annualIncome.toLocaleString()} 円</b></p>
        <p>手取り額（月々）: <b>{Math.floor(netIncome / 12).toLocaleString()} 円</b></p>
        <p>引かれる税金・保険料（年間合計）: <b>{(annualIncome - netIncome).toLocaleString()} 円</b></p>
      </div>

      {isFreelancer && (
        <div className="mt-4 p-4 bg-blue-100 rounded">
          <p>フリーランスの年収: <b>{annualIncome.toLocaleString()} 円</b></p>
          <p>フリーランスの手取り額（月々）: <b>{Math.floor(freelanceNetIncome / 12).toLocaleString()} 円</b></p>
          <p>引かれる税金・保険料（年間合計）: <b>{(annualIncome - freelanceNetIncome).toLocaleString()} 円</b></p>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-6">
        <strong>※ 注意事項 ※</strong><br />
        このシミュレーションは個人開発のため、実際の計算と異なる場合があります。<br />
        正確な金額は厚生労働省のシミュレーターなどをご確認ください。
      </p>

      <p className="text-sm text-gray-500 mt-2">
        <strong>【会社員の場合の内訳】</strong><br />
        ・厚生年金 → 収入の約 9%（労使折半後）<br />
        ・健康保険 → 収入の約 5%（労使折半後）<br />
        ・雇用保険 → 0.6%<br />
        ・所得税 → 収入に応じて 5%〜20%<br />
        ・住民税 → 約10%
      </p>

      <p className="text-sm text-gray-500 mt-2">
        <strong>【フリーランス・個人事業主の場合の内訳】</strong><br />
        ・国民年金 → 一律 16,980円 / 月<br />
        ・健康保険 → 収入の約 14%（地域による）<br />
        ・所得税 → 収入に応じて 5%〜20%<br />
        ・住民税 → 約10%
      </p>
    </div>
  );
}
