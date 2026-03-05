import { Suspense } from "react";
import ProductClient from "@/components/ProductClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
      <ProductClient />
    </Suspense>
  );
}