import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "./store/counterSlice";
import {
  fetchPlayerById,
  listPlayersSelector,
  messageErrorSelector,
  statusSelector,
} from "./store/playerSlice";
import { useEffect } from "react";

function App() {
  const counter = useSelector(state => state.counter.value);
  const players = useSelector(listPlayersSelector);
  const status = useSelector(statusSelector);
  const messageError = useSelector(messageErrorSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const result = await dispatch(fetchPlayerById("1838315")).unwrap();
        console.log("result :", result);
      } catch (error) {
        console.log("error :", error);
      }
    })();
  }, []);

  const handleIncreaseCounter = () => {
    dispatch(increment());
  };

  return (
    <div className="App">
      <p>{counter}</p>
      <button onClick={handleIncreaseCounter}>Tang so len nao</button>
      {status === "loading" ? (
        <div>Loading players...</div>
      ) : (
        <>
          <ol>
            {players &&
              players.length > 0 &&
              players.map(player => <li key={player.account_id}>{player.name ?? "amonyous"}</li>)}
          </ol>
        </>
      )}
      {status === "failed" && (
        <>
          <p>{messageError}</p>
        </>
      )}
    </div>
  );
}

export default App;
