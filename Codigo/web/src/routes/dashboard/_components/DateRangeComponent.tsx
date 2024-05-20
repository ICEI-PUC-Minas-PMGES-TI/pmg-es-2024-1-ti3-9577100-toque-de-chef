import { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

export const DateRangeComponent = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  return (
    <div style={{ width: "100px" }}>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        locale={ptBR}
      />
    </div>
  );
};
