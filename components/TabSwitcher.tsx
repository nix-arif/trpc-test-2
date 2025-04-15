import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  SignUpTab: React.ReactNode;
  SignInTab: React.ReactNode;
};

const TabSwitcher = ({ SignUpTab, SignInTab }: Props) => {
  return (
    <Tabs className="max-w-[800px] min-w-[400px]" defaultValue="sign-in">
      <TabsList className="w-full">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">{SignInTab}</TabsContent>
      <TabsContent value="sign-up">{SignUpTab}</TabsContent>
    </Tabs>
  );
};

export default TabSwitcher;
