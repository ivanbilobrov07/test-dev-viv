import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Container } from "./Layout.styled";

export const Layout = () => {
  return (
    <main>
      <Container>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </Container>
      </main>
  );
};