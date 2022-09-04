import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useLanguage } from "hooks";
import { PaginationSection, Skeleton, NoData } from "components";

export default function TableLoyaltyPoints(props) {
  const language = useLanguage();

  return (
    <section id="TableSection">
      <Row className="mt-4">
        <Col xl={12} lg={12} md={12} xs={12}>
          {props.loading ? (
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
          ) : props.data?.length > 0 ? (
            <Table responsive="xl">
              <thead className="bg-info">
                <tr className="rounded-0">
                  <th className="h7 text-white p-4 text-center text-nowrap ">
                    {language.tableNumber}
                  </th>
                  <th className="h7 text-white p-4 text-center text-nowrap ">
                    {language.tableDate}
                  </th>
                  <th className="h7 text-white p-4 text-center text-nowrap ">
                    {language.tableBalance}
                  </th>
                  <th className="h7 text-white p-4 text-center text-nowrap ">
                    {language.tablePoints}
                  </th>
                  <th className="h7 text-white p-4 text-center text-nowrap ">
                    {language.tableTransactionType}
                  </th>
                </tr>
              </thead>
              <tbody className="border-0">
                {props.data?.map((item, index) => (
                  <tr
                    className=" bg-light border-top bg-danger border-light3"
                    key={index}
                  >
                    <td className="fw-bold h8 text-light6 text-center text-nowrap">
                      {item.id}
                    </td>
                    <td className="fw-bold h8 text-light6 text-center text-nowrap">
                      {item.created_at}
                    </td>
                    <td className="fw-bold h8 text-light6 text-center text-nowrap">
                      {item.balance.toFixed(2)}
                    </td>
                    <td className="fw-bold h8 text-light6 text-center text-nowrap">
                      {item.loyalty_points.toFixed(2)}
                    </td>
                    <td className="fw-bold h8 text-light6 text-center text-nowrap">
                      -
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
          {!props.loading && props.data && (
            <PaginationSection count={props.total} perPage={props.per_page} />
          )}
        </Col>
      </Row>
    </section>
  );
}
