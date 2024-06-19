import { Paper, Button } from "@mui/material";
import { useStateContext } from "../context/stateContext";

function Item({ item }) {
  const { IMAGE_PATH, API_KEY } = useStateContext();
  return (
    <Paper
    // className="papel"
    // style={{
    //   display: "flex",
    //   justifyContent: "center",
    //   flexDirection: "column",
    //   alignItems: "center",
    // }}
    >
      <img
        src={`${IMAGE_PATH}${item.backdrop_path}`}
        alt={item.title}
        style={{ width: `45vw`, height: "100%" }}
      />

      <div
        className="description"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h2>{item.title}</h2>
      </div>

      {/* <Button className="CheckButton">Check it out!</Button> */}
    </Paper>
  );
}

export default Item;
