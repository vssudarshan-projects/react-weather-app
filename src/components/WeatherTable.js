import MaterialTable from "material-table";
import { createRef, forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Container } from "@material-ui/core";
import { Save, Delete } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { materialTableActions } from "../redux-store";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function WeatherTable(props) {
  const tableRef = createRef(); //create a reference variable
  const dispatch = useDispatch();
  dispatch(materialTableActions.setTableRef(tableRef));

  const getData = (query, tableRef) => {
    return new Promise(async (resolve, reject) => {
      const queryParams = {
        ...query,
      };
      delete queryParams.actions;

      let newData;

      console.log(query.actions);
      if (!query.actions) {
        const resolveError = (err, resolve) => {
          console.log(err);
          resolve({
            data: [],
            page: 0,
            totalCount: 0,
          });
        };

        //Data render behaviour when we get data from API
        console.log("GET REMOTE DATA");
        fetch(
          "/api?page=" +
            query.page +
            "&pageSize=" +
            query.pageSize +
            "&city=" +
            query.search
        )
          .then((response) => {
            response
              .json()
              .then((jsonData) => {
                resolve({
                  data: jsonData.weatherData,
                  page: jsonData.paginationInfo.page,
                  totalCount: jsonData.paginationInfo.totalCount,
                });
              })
              .catch((err) => {
                resolveError(err, resolve);
              });
          })
          .catch((err) => {
            resolveError(err, resolve);
          });
        return;
      }

      //Data render behaviour on Table Actions
      console.log("USE TABLE DATA");
      // if (query.actions.type === "delete") {
      //   newData = tableRef.current.dataManager
      //     .getRenderState()
      //     .data.filter((data) => data.tableData.id !== query.actions.id);
      // } else
      if (query.actions.type === "save") {
        newData = tableRef.current.dataManager.getRenderState().data;
      }

      resolve({
        data: newData,
        page: tableRef.current.state.query.page,
        totalCount: tableRef.current.state.query.totalCount,
      });
      delete query.actions;
    });
  };

  const handleSave = (event, rowData, tableRef) => {
    const weatherData = {
      ...rowData,
    };
    delete weatherData.tableData;
    delete weatherData.isNewData;
    fetch("/save?weatherData=" + JSON.stringify(weatherData)).then(() => {
      tableRef.current.dataManager.data[rowData.tableData.id].isNewData = false;
      tableRef.current.onQueryChange({
        actions: { type: "save", id: rowData.tableData.id },
      });
    });
  };

  const handleDelete = (event, rowData, tableRef) => {
    fetch(
      "/delete?q=" +
        JSON.stringify({ city: rowData.city, country: rowData.country })
    );
    tableRef.current.onQueryChange();
  };

  return (
    <Container style={{ margin: "0 2rem" }}>
      <MaterialTable
        title="Weather Data"
        tableRef={tableRef} //assign the reference to Material Table
        columns={[
          {
            title: "City",
            field: "city",
            type: "string",
          },
          {
            title: "Country",
            field: "country",
            type: "string",
          },
          { title: "Weather", field: "weather", type: "string" },
          { title: "Temperature", field: "temperature", type: "numeric" },
          { title: "Pressure", field: "pressure", type: "numeric" },
          { title: "Humidity", field: "humidity", type: "numeric" },
          { title: "Wind Speed", field: "windSpeed", type: "numeric" },
          { title: "Visibility", field: "visibility", type: "numeric" },
        ]}
        data={(query) => getData(query, tableRef)}
        actions={[
          (rowData) => ({
            icon: Save,
            tooltip: "Save Data",
            onClick: (event, dataRow) => handleSave(event, dataRow, tableRef),
            disabled: !rowData.isNewData,
          }),
          (rowData) => ({
            icon: Delete,
            tooltip: "Delete Data",
            onClick: (event, dataRow) => handleDelete(event, dataRow, tableRef),
            disabled: rowData.isNewData,
          }),
        ]}
        icons={tableIcons}
      ></MaterialTable>
    </Container>
  );
}
