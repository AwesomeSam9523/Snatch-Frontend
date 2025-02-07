import { Suspense } from "react";
import Login from "./madeComponents/Login";
import FullScreenLoading from "./madeComponents/FullScreenLoading";


const Page = () => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Login/>
    </Suspense>
  );
};

export default Page;
