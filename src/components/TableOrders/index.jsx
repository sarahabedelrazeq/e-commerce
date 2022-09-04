import React from "react";
import { Table } from "react-bootstrap";
import { useLanguage } from "hooks";
import { Link } from "react-router-dom";
import {NoData} from "components";

export default function TableOrders({ DataContent }) {
  const language = useLanguage();
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (DataContent) {
      let total = 0;
      DataContent.forEach(
        ({ total_amount, type, statement_of_account }) =>
          (total =
            type === 2
              ? total + statement_of_account?.balance
              : total + total_amount)
      );
      setTotal(total);
    }
  }, [DataContent]);

  return (
    <div id="TableOrders">
      {DataContent && DataContent.length > 0 ? (
        <Table responsive="xl">
          <thead className="bg-info">
            <tr className="rounded-0">
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableNumber}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableDateAndTime}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap  tableOrders--product">
                {language.details}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableQuantity}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableSingleAmount}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableTotalAmount} ( {total.toFixed(2)} )
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableUsername}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableRemainedBalance}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.details}
              </th>
            </tr>
          </thead>
          <tbody className="border-0">
            {DataContent?.map(
              (
                {
                  type,
                  created_at,
                  id,
                  user,
                  item,
                  description,
                  sell_price,
                  total_amount,
                  statement_of_account,
                  qty,
                  balance_after_purchase,
                },
                index
              ) => (
                <tr
                  className="p-5 bg-light border-top border-light3"
                  key={index}
                >
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {id}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {created_at}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {type === 1 && item?.name}
                    {type === 2 &&
                      (statement_of_account.from_admin
                        ? language.chargeProcessAdmin
                        : language.chargeProcessAgent)}
                    {type === 3 && item?.name}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {(type === 1 || type === 3) && qty}
                    {type === 2 && "---"}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {(type === 1 || type === 3) && sell_price.toFixed(2)}
                    {type === 2 && statement_of_account.balance.toFixed(2)}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {(type === 1 || type === 3) && total_amount.toFixed(2)}
                    {type === 2 && statement_of_account.balance.toFixed(2)}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {user.name}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {balance_after_purchase?.toFixed(2) || "---"}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    <Link to={`/my-orders-details/${id}`}>
                      {language.details}
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      ) : (
        <NoData />
      )}
    </div>
  );
}
