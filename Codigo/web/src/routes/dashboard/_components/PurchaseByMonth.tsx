import React from "react";
import { Chart } from "react-google-charts";
import { DateRangeComponent } from "./DateRangeComponent";
import { DropdownButton, Button } from "react-bootstrap";
import { useReadPurchaseDashboard } from "../../../api/Dashboard/useReadPurchaseDashboard";
import { useReadPurchaseDashboardYear } from "../../../api/Dashboard/useReadPurchaseDashboardYear";
import { useReadMonthPurchase } from "../../../api/Dashboard/useReadMonthPurchase";

interface InfoCardProps {
  titulo: string;
  descricao: string;
  backgroundColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  titulo,
  descricao,
  backgroundColor,
}) => {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "16px",
        backgroundColor: backgroundColor,
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p className="h6 m-0">{titulo}</p>
      <p className="m-0">
        <small>{descricao}</small>
      </p>
    </div>
  );
};

export const PurchaseByMonth: React.FC = () => {
  const { data: monthPurchaseData } = useReadMonthPurchase();

  return (
    <>
      <div className="p-2">Dashboard</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "48px",
        }}
      >
        <InfoCard
          titulo={monthPurchaseData?.lastPurchaseDate || "-"}
          descricao="Última Compra"
          backgroundColor=""
        />
        <InfoCard
          titulo={`R$ ${monthPurchaseData?.totalThisMonth.toFixed(2) || "0,00"}`}
          descricao="Gasto esse mês"
          backgroundColor=""
        />
        <InfoCard
          titulo={`R$ ${monthPurchaseData?.averageMonthlySpending.toFixed(2) || "0,00"}`}
          descricao="Média mensal de gastos"
          backgroundColor=""
        />
      </div>
    </>
  );
};
