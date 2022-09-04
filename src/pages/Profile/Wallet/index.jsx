import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { TableAddWallet, AddBalance } from "components";
import { useLanguage } from "hooks";
import { ProfileLayout } from "components/layouts";

/* Wallet - page  */
export default function Wallet() {
  /* Change language and direction */
  const language = useLanguage();

  return (
    <ProfileLayout id="wallet-page">
      <Tabs
        id="wallet"
        defaultActiveKey="viewWallet"
        className="border-0 justify-content-center justify-content-xl-start justify-content-lg-start justify-content-md-start mb-4 mb-md-5"
      >
        <Tab
          eventKey="viewWallet"
          tabClassName="h3 text-light4 bg-transparent border-0"
          title={language.ProvideDelegate}
        >
          <TableAddWallet />
        </Tab>
        <Tab
          eventKey="addDeposite"
          tabClassName="h3 text-light4 bg-transparent border-0"
          title={language.addCredit}
        >
          <AddBalance />
        </Tab>
      </Tabs>
    </ProfileLayout>
  );
}
