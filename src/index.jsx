import { createRoot } from "react-dom/client";

import "./index.scss";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
