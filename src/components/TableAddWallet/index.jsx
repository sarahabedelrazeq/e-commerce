import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useFetch, useLanguage, usePagination } from "hooks";
import { PaginationSection, Skeleton, NoData} from "components";

/* Table Section component - can evaluate tables by using props and its data fulfilled from api */
export default function TableAddWallet() {
  const language = useLanguage();
  const [itemResponse, itemRequest] = useFetch("user/get-balance-info");
  const DataContent = itemResponse.result.data;

  // Pagination - Start
  const { page } = usePagination();

  React.useEffect(() => {
    itemRequest(null, `?page=${page}`);
  }, [itemRequest, page]);
  // Pagination - End

  return (
    <div id="TableSection">
      <Row className="table--container">
        <Col xl={12} lg={12} md={12} xs={12}>
          {itemResponse.loading ? (
            <Row>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start mt-2 pt-4 mb-4 align-items-center"
              >
                <Skeleton count={1} width="100%" height={600} />
              </Col>
            </Row>
          ) : itemResponse.result.data?.length > 0 ? (
            <Table responsive="xl">
              <thead className="bg-info">
              <tr className="rounded-0">
                  <th className="h7 text-white p-4 text-center text-nowrap">
                    {language.tableNumber}
                  </th>
                  <th className="h7 text-white p-4 text-center text-nowrap">
                    {language.tableDate}
                  </th>
                  <th className="h7 text-white p-4 text-center text-nowrap">
                    {language.tableBalance}
                  </th>
                  <th className="h7 text-white p-4 text-center text-nowrap">
                    {language.tableTransactionType}
                  </th>
                </tr>
              </thead>
              <tbody className="border-0">
                {DataContent?.map((item, index) => (
                  <tr className="bg-light border-top bg-danger border-light3" key={index}>
                    <td className="fw-bold h8 text-light6 text-center text-nowrap">{item.id}</td>
                    <td className="fw-bold h8 text-light6 text-center text-nowrap">
                      {item.created_at}
                    </td>
                    <td className="fw-bold h8 text-light6 text-center text-nowrap">
                      {item.balance.toFixed(2)}
                    </td>
                    <td className="fw-bold h8 text-light6 text-center text-nowrap">
                      {item.type_of_wallet}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <NoData />
          )}
        </Col>

        <Col xl={12} lg={12} md={12} xs={12}>
          {itemResponse.result.data?.length > 0 && (
            <PaginationSection
              count={itemResponse.result.meta.total}
              perPage={itemResponse.result.meta.per_page}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
