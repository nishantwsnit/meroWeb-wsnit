"use client";
import Header from "@/app/(admin)/layout/header";
import Sidebar from "@/app/(admin)/layout/sidebar";
import { Card, Grid } from "@aws-amplify/ui-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Card backgroundColor={"white"}>
        <Header />
      </Card>
      <Grid templateColumns="0.5fr 3fr ">
        <Card backgroundColor={"white"} minHeight={"calc(100vh - 80px)"}>
          <Sidebar />
        </Card>
        <main>
          <Card
            backgroundColor={"whitesmoke"}
            minHeight={"calc(100vh - 120px)"}
            columnStart="1"
            columnEnd="3"
          >
            <Card
              borderRadius={"12px"}
              backgroundColor={"white"}
              minHeight={"calc(100vh - 120px)"}
            >
              {children}
            </Card>
          </Card>
        </main>
      </Grid>
    </div>
  );
}
