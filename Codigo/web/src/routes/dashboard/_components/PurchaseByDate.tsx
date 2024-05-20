import React from "react";
import { Chart } from "react-google-charts";
import { DateRangeComponent } from "./DateRangeComponent";
import { DropdownButton, Dropdown } from "react-bootstrap";

export const data = [
  ["Dia", "Valor"],
  ["2014", 400],
  ["2015", 460],
  ["2016", 1120],
  ["2017", 540],
  ["2017", 0],
  ["2017", 540],
  ["2017", 540],
];

export const options = {
  chart: {},
};

export const PurchaseByDate = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="p-2">Compras Efetuadas</div>

        <DropdownButton
          id="dropdown-basic-button"
          title="Selecione o Período"
          className="text-white"
        >
          <DateRangeComponent />
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
