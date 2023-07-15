import './App.css';
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';

//Components
import { DataTableProcessosComponent } from "./components/data-table-processos-component/data-table-processos-component.js";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [processoSelecionado, setProcessoSelecionado] = useState();

  //Modal
  const [showModalCadastro, setShowModalCadastro] = useState();

  let data = [
    {
      Codigo:1,
      Numero: 1,
      Nome: "Processo 1",
      Descrição: "Descrição Processo 1",
      Inicio: new Date(),
      Fim: new Date(),
      Status: 1,
      Classificação: 1,
      Ano: 2023
    },
    {
      Codigo:2,
      Numero: 2,
      Nome: "Processo 2",
      Descrição: "Descrição Processo 2",
      Inicio: new Date(),
      Fim: new Date(),
      Status: 2,
      Classificação: 2,
      Ano: 2023
    } 
  ]

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {field: 'Codigo', filter: true},
    {field: 'Numero', filter: true},
    {field: 'Nome', filter: true},
    {field: 'Descrição'},
    {field: 'Inicio'},
    {field: 'Fim'},
    {field: 'Status'},
    {field: 'Classificação'},
    {field: 'Ano'}
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
      sortable: true
    }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  // Example load data from server
  useEffect(() => {    
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
    .then(result => result.json())
    .then(rowData => setRowData(data))
  }, []);

  // Example using Grid's API
  const openModalCadastrarProcesso = useCallback( e => {
    
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    setProcessoSelecionado(selectedRows.length === 1 ? selectedRows[0] : '')
    console.log(selectedRows.length === 1 ? selectedRows[0] : '')
    console.log(processoSelecionado)    
  }, []);

  const handleOpenModalCadastro = () => {
    this.setState({ showModal: true });
  }
  
  const handleCloseModalCadastro = () => {
    this.setState({ showModal: false });
  }

  return (
      <div>
        <DataTableProcessosComponent/>        
      </div>
  );
};

export default App;
