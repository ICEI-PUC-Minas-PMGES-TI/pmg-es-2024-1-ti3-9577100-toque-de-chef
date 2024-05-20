import { Trash } from "react-bootstrap-icons";

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
          titulo="20/10/2024"
          descricao="Última Compra"
          backgroundColor=""
        />
        <InfoCard
          titulo="R$ 1200,00"
          descricao="Gasto esse mês"
          backgroundColor=""
        />
        <InfoCard
          titulo="R$ 2300,00"
          descricao="Média mensal de gastos"
          backgroundColor=""
        />
      </div>
    </>
  );
};
