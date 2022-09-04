import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useLanguage, useToggle } from "hooks";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrintOrderDetails } from "components/PrintComponent";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";

export default function TableOrdersDetails(data) {
  const language = useLanguage();
  let componentRef = React.useRef();
  const DataOrderDetails = data.data;
  const [index, settIndex] = React.useState(null);
  const [exportData, setExportData] = React.useState(null);
  const [print, setPrint] = useToggle();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  React.useEffect(() => {
    if (print) {
      handlePrint();
      setPrint();
    }
  }, [print, handlePrint, setPrint]);
  const toNumber = (num) => parseFloat(num).toFixed(2);

  React.useEffect(() => {
    let custs = [];
    if (DataOrderDetails && DataOrderDetails?.order_details) {
      DataOrderDetails?.order_details?.forEach((item) => {
        custs.push({
          ["name"]: DataOrderDetails.item.name,
          ["serialNumber"]: item.cards.serial_no,
          ["code-1"]: `${item.cards.bins[0].bin}`,
          ["code-2"]: item.cards.bins[1]
            ? item.cards.bins[1].bin
            : "-",
        });
      });
    }

    setExportData(custs);
  }, [DataOrderDetails]);

  const _export = React.useRef(null);

  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

  return (
    <section id="TableOrdersDetails">
      <div>
        <Row className="mb-3 align-items-center">
          <Col sm={6} xs={12}>
            <div className="d-flex gap-1">
              <p>{language.totalAmount}:</p>
              <p>{DataOrderDetails.total_amount}</p>
            </div>
            <div className="d-flex gap-1">
              <p>{language.fullNumber}:</p>
              <p>{DataOrderDetails.order_details?.length}</p>
            </div>
          </Col>
          <Col sm={6} xs={12} className="mb-3">
            <div className="d-flex gap-4 justify-content-sm-end justify-content-center">
              <div id="print_component" className="text-center text-nowrap">
                {DataOrderDetails?.order_details?.length > 1 && (
                  <Button
                    variant="primary"
                    className="cart--add-btn"
                    onClick={() => {
                      setPrint();
                      settIndex(null);
                    }}
                  >
                    {language.printAllOrders}
                  </Button>
                )}

                <div className="d-none">
                  <ComponentToPrintOrderDetails
                    ref={componentRef}
                    index={index}
                    {...DataOrderDetails}
                  />
                </div>
              </div>
              <div id="print_component" className="text-center text-nowrap">
                {DataOrderDetails?.order_details?.length > 0 && (
                  <Button onClick={excelExport}>{language.export}</Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Table responsive="xl">
          <thead className="bg-info">
            <tr className="rounded-0">
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableNumber}
              </th>

              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.description}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.referenceNumber}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.serialNumber}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.codeDetails}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableUsername}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.amount}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.tableDateAndTime}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.print}
              </th>
              <th className="h7 text-white p-4 text-center text-nowrap ">
                {language.copy}
              </th>
            </tr>
          </thead>
          <tbody className="border-0">
            {DataOrderDetails &&
              DataOrderDetails?.order_details?.map((item, index) => (
                <tr
                  className="p-5 bg-light border-top border-light3"
                  key={index}
                >
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {DataOrderDetails.id}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {DataOrderDetails.item.name}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {item.id}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {item.cards.serial_no}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {item.cards.bins?.map((binItem, index) => (
                      <span key={index}>{binItem.bin}</span>
                    ))}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {DataOrderDetails.user.name}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {toNumber(DataOrderDetails.item?.sell_price)}
                    {DataOrderDetails?.user.place_parent.currency}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    {DataOrderDetails.created_at}
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    <div id="print_component">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setPrint();
                          settIndex(index);
                        }}
                      >
                        {language.print}
                      </Button>
                    </div>
                  </td>
                  <td className="fw-bold h8 text-light6 text-center text-nowrap">
                    <div id="print_component">
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigator.clipboard.writeText(item.cards.bins[0].bin);
                        }}
                      >
                        {language.copy}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Row className="mb-3 align-items-center">
          <Col sm={6} xs={12}>
            <div className="d-flex gap-1">
              <p>{language.totalAmount}:</p>
              <p>{DataOrderDetails.total_amount}</p>
            </div>
            <div className="d-flex gap-1">
              <p>{language.fullNumber}:</p>
              <p>{DataOrderDetails.order_details?.length}</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="d-none">
        <ExcelExport data={exportData} ref={_export} fileName={`orders-details-${DataOrderDetails?.id}.xlsx`}>
          <Grid
            data={exportData}
            style={{
              height: "420px",
            }}
          >
            <GridColumn
              field="name"
              title={language.tableProduct_name}
              width="100px"
            />
            <GridColumn
              field="serialNumber"
              title={language.serialNumber}
              width="100px"
            />
            <GridColumn
              field="code-1"
              width="100px"
              title={`${language.codeDetails} 1`}
              cellOptions={{
                format:"@"
              }}
            />
            <GridColumn
              field="code-2"
              width="100px"
              title={`${language.codeDetails} 2`}
              cellOptions={{
                format:"@"
              }}
            />
          </Grid>
        </ExcelExport>
      </div>
    </section>
  );
}
