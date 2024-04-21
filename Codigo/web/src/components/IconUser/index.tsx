import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getInitials } from "../../helpers/Utils/Util";
import { useCurrentUser } from "../../api/User/useCurrentUser";

interface IconUserProps {
  tam: string;
  fontSize: string;
}

const IconUser: React.FC<IconUserProps> = ({ tam, fontSize }) => {
  const { data: currentUser } = useCurrentUser();

  const name = getInitials(currentUser?.name || "");
  console.log("name", name);

  return (
    <div
      style={{
        borderRadius: "100%",
        display: "flex",
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center",
        fontSize: fontSize,
        color: "#FFF",
        width: tam,
        height: tam,
      }}
      className="bg-primary"
    >
      {name}
    </div>
  );
};

export default IconUser;
