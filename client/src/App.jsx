import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable";
import theme from "./theme/theme.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ContactTable />,
    },
    {
      path: "/form",
      element: <ContactForm />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
