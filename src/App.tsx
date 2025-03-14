import { BrowserRouter, Route, Routes } from "react-router";
import { HomeRoute } from "./routes/home-route";
import { Layout } from "./components/layout/layout";
import { ThemeProvider } from "./lib/theme-provider";
import { DetailRoute } from "./routes/detail-route";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomeRoute />} />
            <Route path="/detail" element={<DetailRoute />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
