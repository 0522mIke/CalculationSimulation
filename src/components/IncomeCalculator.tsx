import { useState } from "react";

type IncomeCalculatorProps = {
  setAnnualIncome: React.Dispatch<React.SetStateAction<number>>;
};

export default function IncomeCalculator({ setAnnualIncome }: IncomeCalculatorProps) {
  const [salary, setSalary] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [isFreelancer, setIsFreelancer] = useState<boolean>(false);

  const [annualIncome, setAnnualIncomeLocal] = useState<number>(0);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSalary = Number(e.target.value);
    setSalary(newSalary);
    setAnnualIncome(isMonthly ? newSalary * 12 + bonus : newSalary + bonus);
  };

  const handleBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBonus = Number(e.target.value);
    setBonus(newBonus);
    setAnnualIncome(isMonthly ? salary * 12 + newBonus : salary + newBonus);
  };

  // 残りのロジックはそのままで
  const healthInsurance = annualIncome * 0.09;
  const pension = (annualIncome * 0.183) / 2;
  const incomeTax = annualIncome * 0.05;
  const residentTax = (annualIncome * 0.10) / 2;
  const netIncome = annualIncome - (healthInsurance + pension + incomeTax + residentTax);

  const freelanceHealthInsurance = annualIncome * 0.10;
  const freelancePension = 16980 * 12;
  const taxableIncome = Math.max(annualIncome - freelancePension, 0);
  let incomeTaxRate = 0.05;
  if (taxableIncome > 1950000) {
    incomeTaxRate = 0.1;
  }
  if (taxableIncome > 3300000) {
    incomeTaxRate = 0.2;
  }
  const freelanceIncomeTax = (annualIncome - freelancePension) * incomeTaxRate;
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
          onChange={handleSalaryChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">ボーナス（年間合計）</label>
        <input
          type="number"
          value={bonus}
          onChange={handleBonusChange}
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
        ・健康保険 → 収入の約 10%（地域による変動あり）<br />
        ・所得税 → 累進課税 ※課税所得によりざっくり 5~20%<br />
        ・住民税 → 約10%
      </p>
    </div>
  );
}
