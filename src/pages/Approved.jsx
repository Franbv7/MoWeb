import { useEffect } from "react";
import { useStateContext } from "../context/stateContext";
import { createSession } from "../services/index";
import { Header } from "../components/Header";

const Approved = () => {
  const { API_KEY, setUser } = useStateContext();

  useEffect(() => {
    const createSessionId = async () => {
      const params = new URLSearchParams(window.location.search);
      const requestToken = params.get("request_token");

      if (requestToken) {
        const sessionId = await createSession(requestToken, API_KEY);
        if (sessionId) {
          alert("Sesión creada exitosamente!");
          setUser({ sessionId });
          console.log("Session ID:", sessionId);
        } else {
          alert("Error al crear la sesión.");
        }
      }
    };

    createSessionId();
  }, [API_KEY, setUser]);

  return (
    <>
      <Header />
      <div style={{ paddingTop: "3rem" }}>
        {" "}
        Autenticación aprobada. Creando sesión...
      </div>
    </>
  );
};

export default Approved;
