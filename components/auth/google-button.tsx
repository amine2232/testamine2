"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function GoogleButton() {
  return (
    <Button variant="outline" className="mb-6 h-12">
      <Image
        src="https://www.google.com/favicon.ico"
        alt="Google"
        width={20}
        height={20}
        className="mr-2"
      />
      CONTINUE WITH GOOGLE
    </Button>
  );
}