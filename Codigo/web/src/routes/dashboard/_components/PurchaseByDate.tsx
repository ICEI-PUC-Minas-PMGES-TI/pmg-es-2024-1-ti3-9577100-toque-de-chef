import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { DateRangeComponent } from "./DateRangeComponent";
import { DropdownButton, Button } from "react-bootstrap";
import { useReadPurchaseDashboard } from "../../../api/Dashboard/useReadPurchaseDashboard";
import { useReadPurchaseDashboardYear } from "../../../api/Dashboard/useReadPurchaseDashboardYear";

export const options = {
  chart: {},
};

export const PurchaseByDate = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  const { data: purchaseData } = useReadPurchaseDashboard(startDate, endDate, {
    enabled: !isAnnual,
  });

  const { data: annualPurchaseData } = useReadPurchaseDashboardYear({
    enabled: isAnnual,
  });

  const data = [
    ["Dia", "Valor"],
    ...(isAnnual
      ? annualPurchaseData?.purchases
      : purchaseData?.purchases || []
    ).map((purchase) => [purchase.name, purchase.value]),
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="p-2">Valor total de Compras</div>

        <DropdownButton
          id="dropdown-basic-button"
          title="Selecione o Período"
          className="text-white"
        >
          <DateRangeComponent
            onDateChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
              setIsAnnual(false);
            }}
          />

          <div
            style={{ width: "340px" }}
            className="bg-light d-flex justify-content-end"
          >
            <Button
              variant="secondary"
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                setIsAnnual(true);
              }}
            >
              Anual
            </Button>
          </div>
        </DropdownButton>
      </div>

      <div
        className="p-4"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
        }}
      >
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </>
  );
};
