import './data-table-processos-component.css'

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';

export class DataTableProcessosComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // campos formulario
            // form macroProcesso
            macroNumero: null,
            macroNome: null,
            macroDescricao: null,
            macroDataInicio: null,
            macroDataTermino: null,
            macroStatus: null,
            macroClassificacao: null,
            macroAno: null,   
            // form classificação
            classificacaoDescricao: null,
            // form Processo
            processoNumero: null,
            processoNome: null,
            processoDescricao: null,
            processoDataInicio: null,
            processoDataTermino: null,
            processoStatus: null,
            processoClassificacao: null,
            processoAno: null,  
            
            // Listas
            classificacoes: [],
            macroProcessos: [],
            processos: [],
            
            displayModalCadastrarClassificacao: false,
            displayModalCadastrarProcesso: false,
            displayModalCadastrarMacroProcesso: false,
                        
            displayModalEditar: false,
            displayModalConfirmar: false,            
            position: 'center'
        };        
    }

    salvarClassificacao() {
        this.limparForm();
        this.closeModal('displayModalCadastrarClassificacao');
    }

    salvarMacroProcesso() {
        console.log(this.state.dataInicio)   
        let macroProcesso = {
            numero: this.state.numero,
            nome: this.state.nome,
            descricao: this.state.descricao,
            dataInicio: this.state.dataInicio,
            dataTermino: this.state.dataTermino,
            status: this.state.status,
            classificacao: this.state.classificacao,
            ano: this.state.ano
        } 
        const newList = this.state.macroProcessos.concat(macroProcesso);
        this.state.macroProcessos = newList;
        this.limparForm();
        this.closeModal('displayModalCadastrarMacroProcesso');
    }

    salvarProcesso() {
        this.limparForm();
        this.closeModal('displayModalCadastrarProcesso');
    }

    limparForm() {
        this.state.numero =
        this.state.nome =
        this.state.descricao =
        this.state.dataInicio =
        this.state.dataTermino =
        this.state.status =
        this.state.classificacao =
        this.state.ano = null;
    }

    openModal(name) {        
        let state = {
            [`${name}`]: true
        };

        this.setState(state);
    }        
    
    closeModal(name) {
        this.setState({
            [`${name}`]: false
        });
    }
    
    renderFooter(name) {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => this.closeModal(name)} className="p-button-text" />
                <Button label="Confirmar" icon="pi pi-check" onClick={() => this.closeModal(name)} autoFocus />
            </div>
        );
    }

    renderFooterModalCadastrarClassificacao() {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => this.closeModal('displayModalCadastrarClassificacao')} className="p-button-danger" />
                <Button label="Salvar" icon="pi pi-check" onClick={() => this.salvarClassificacao()} className='p-button-success' autoFocus />
            </div>
        );
    }

    renderFooterModalCadastrarMacroProcesso() {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => this.closeModal('displayModalCadastrarMacroProcesso')} className="p-button-danger" />
                <Button label="Salvar" icon="pi pi-check" onClick={() => this.salvarMacroProcesso()} className='p-button-success' autoFocus />
            </div>
        );
    }

    renderFooterModalCadastrarProcesso() {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => this.closeModal('displayModalCadastrarProcesso')} className="p-button-danger" />
                <Button label="Salvar" icon="pi pi-check" onClick={() => this.salvarProcesso()} className='p-button-success' autoFocus />
            </div>
        );
    }
    
    render() {
        return (            
            <div className="grid">
                {/* Tabela Classificações*/}
                <div className="col-1"></div>
                <div className="col-2">
                    <Button label="Cadastrar Classificação" className="p-button-raised p-button-success" onClick={() => this.openModal('displayModalCadastrarClassificacao')}/>
                </div>
                <div className="col-9"></div>                
                <div className="col-1"></div>
                <div className="card col-10">
                    <DataTable value={this.state.classificacoes} header='Classificações'>                        
                        <Column field="descricao" header="Descrição"></Column>                                                                     
                        <Column body={
                            <div className="grid">
                            <div className="col-4">
                                <Button type="button" icon="pi pi-pencil" className="p-button-warning" onClick={() => this.openModal('displayModalCadastrar')}></Button>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-4">
                                <Button type="button" icon="pi pi-trash" className="p-button-danger" onClick={() => this.openModal('displayModalConfirmar')}></Button>
                            </div>
                        </div>
                        } headerStyle={{width: '8em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
                    </DataTable>            
                </div>
                <div className="col-1"></div>

                {/* Tabela Macro Processos*/}
                <div className="col-1"></div>
                <div className="col-2">
                    <Button label="Cadastrar Macro Processo" className="p-button-raised p-button-success" onClick={() => this.openModal('displayModalCadastrarMacroProcesso')}/>
                </div>
                <div className="col-9"></div>                
                <div className="col-1"></div>
                <div className="card col-10">
                    <DataTable value={this.state.macroProcessos} header='Macro Processos'>                                             
                        <Column field="numero" header="Numero"></Column>
                        <Column field="nome" header="Nome"></Column>
                        <Column field="descricao" header="Descrição"></Column>
                        
                        <Column field="dataTermino" header="Fim"></Column>
                        <Column field="status" header="Status"></Column>
                        <Column field="classificacao" header="Classificação"></Column>
                        <Column field="ano" header="Ano"></Column>                                                
                        <Column body={
                            <div className="grid">
                            <div className="col-4">
                                <Button type="button" icon="pi pi-pencil" className="p-button-warning" onClick={() => this.openModal('displayModalCadastrar')}></Button>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-4">
                                <Button type="button" icon="pi pi-trash" className="p-button-danger" onClick={() => this.openModal('displayModalConfirmar')}></Button>
                            </div>
                        </div>
                        } headerStyle={{width: '8em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
                    </DataTable>            
                </div>
                <div className="col-1"></div>

                {/* Tabela Processos*/}
                <div className="col-1"></div>
                <div className="col-2">
                    <Button label="Cadastrar processo" className="p-button-raised p-button-success" onClick={() => this.openModal('displayModalCadastrarProcesso')}/>
                </div>
                <div className="col-9"></div>
                <div className="col-1"></div>
                <div className="card col-10">
                    <DataTable value={this.state.processos} header='Processos' className="p-datatable-customers">                                             
                        <Column field="numero" header="Numero"></Column>
                        <Column field="nome" header="Nome"></Column>
                        <Column field="descricao" header="Descrição"></Column>
                        
                        <Column field="dataTermino" header="Fim"></Column>
                        <Column field="status" header="Status"></Column>
                        <Column field="classificacao" header="Classificação"></Column>
                        <Column field="ano" header="Ano"></Column>                                                
                        <Column body={
                            <div className="grid">
                            <div className="col-4">
                                <Button type="button" icon="pi pi-pencil" className="p-button-warning" onClick={() => this.openModal('displayModalCadastrar')}></Button>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-4">
                                <Button type="button" icon="pi pi-trash" className="p-button-danger" onClick={() => this.openModal('displayModalConfirmar')}></Button>
                            </div>
                        </div>
                        } headerStyle={{width: '8em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
                    </DataTable>            
                </div>
                <div className="col-1"></div>


                {/* Modal cadastrar classificação*/}
                <Dialog header="Cadastrar Classificação" visible={this.state.displayModalCadastrarClassificacao} style={{ width: '50vw' }} footer={this.renderFooterModalCadastrarClassificacao()} onHide={() => this.closeModal('displayModalCadastrarClassificacao')}>
                    <div className="form">
                        <div className="p-fluid p-formgrid grid">                            
                            <div className="p-field col-12">
                                <label htmlFor="descricao">Descrição</label>        
                                <InputTextarea id="descricao" rows={4} cols={30} value={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.value})} autoResize />
                            </div>                                                      
                        </div>
                    </div>
                </Dialog>

                {/* Modal cadastrar macro processo */}
                <Dialog header="Cadastrar Macro Processo" visible={this.state.displayModalCadastrarMacroProcesso} style={{ width: '50vw' }} footer={this.renderFooterModalCadastrarMacroProcesso()} onHide={() => this.closeModal('displayModalCadastrarMacroProcesso')}>
                    <div className="form">
                        <div className="p-fluid p-formgrid grid">
                            <div className="p-field col-6">
                                <label htmlFor="numero">Numero</label>
                                <InputNumber id="numero" value={this.state.numero} onValueChange={(e) => this.setState({numero: e.target.value})} useGrouping={false}/>
                            </div>
                            <div className="p-field col-6">
                                <label htmlFor="nome">Nome</label>
                                <InputText id="nome" value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})} />
                            </div>
                            <div className="p-field col-12">
                                <label htmlFor="descricao">Descrição</label>        
                                <InputTextarea id="descricao" rows={4} cols={30} value={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.value})} autoResize />
                            </div>
                            <div className="p-field col-6">
                                <label htmlFor="dataInicio">Data inicio</label>        
                                <Calendar id="dataInicio" value={this.state.dataInicio} onChange={(e) => this.setState({dataInicio: e.target.value})} />
                            </div>
                            <div className="p-field col-6">
                                <label htmlFor="dataTermino">Data termino</label>
                                <Calendar id="dataTermino" value={this.state.dataTermino} onChange={(e) => this.setState({dataTermino: e.target.value})} />                                
                            </div>
                            <div className="p-field col">
                                <label htmlFor="status">Status</label>
                                <InputNumber id="status" value={this.state.status} onValueChange={(e) => this.setState({status: e.target.value})} useGrouping={false}/>
                            </div>
                            <div className="p-field col">
                                <label htmlFor="classificacao">Classificação</label>
                                <InputNumber id="classificacao" value={this.state.classificacao} onValueChange={(e) => this.setState({classificacao: e.target.value})} useGrouping={false}/>
                            </div>
                            <div className="p-field col">                               
                                <label htmlFor="ano">Ano</label>
                                <InputNumber id="ano" value={this.state.ano} onValueChange={(e) => this.setState({ano: e.target.value})} useGrouping={false}/>
                            </div>                            
                        </div>
                    </div>
                </Dialog>

                {/* Modal cadastrar processo */}
                <Dialog header="Cadastrar Processo" visible={this.state.displayModalCadastrarProcesso} style={{ width: '50vw' }} footer={this.renderFooterModalCadastrarProcesso()} onHide={() => this.closeModal('displayModalCadastrarProcesso')}>
                    <div className="form">
                        <div className="p-fluid p-formgrid grid">
                            <div className="p-field col-6">
                                <label htmlFor="numero">Numero</label>
                                <InputNumber id="numero" value={this.state.numero} onValueChange={(e) => this.setState({numero: e.target.value})} useGrouping={false}/>
                            </div>
                            <div className="p-field col-6">
                                <label htmlFor="nome">Nome</label>
                                <InputText id="nome" value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})} />
                            </div>
                            <div className="p-field col-12">
                                <label htmlFor="descricao">Descrição</label>        
                                <InputTextarea id="descricao" rows={4} cols={30} value={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.value})} autoResize />
                            </div>
                            <div className="p-field col-6">
                                <label htmlFor="dataInicio">Data inicio</label>        
                                <Calendar id="dataInicio" value={this.state.dataInicio} onChange={(e) => this.setState({dataInicio: e.target.value})} />
                            </div>
                            <div className="p-field col-6">
                                <label htmlFor="dataTermino">Data termino</label>
                                <Calendar id="dataTermino" value={this.state.dataTermino} onChange={(e) => this.setState({dataTermino: e.target.value})} />                                
                            </div>
                            <div className="p-field col">
                                <label htmlFor="status">Status</label>
                                <InputNumber id="status" value={this.state.status} onValueChange={(e) => this.setState({status: e.target.value})} useGrouping={false}/>
                            </div>
                            <div className="p-field col">
                                <label htmlFor="classificacao">Classificação</label>
                                <InputNumber id="classificacao" value={this.state.classificacao} onValueChange={(e) => this.setState({classificacao: e.target.value})} useGrouping={false}/>
                            </div>
                            <div className="p-field col">                               
                                <label htmlFor="ano">Ano</label>
                                <InputNumber id="ano" value={this.state.ano} onValueChange={(e) => this.setState({ano: e.target.value})} useGrouping={false}/>
                            </div>                            
                        </div>
                    </div>
                </Dialog>

                {/* Modal editar Processos */}                
                <Dialog header="Editar Processo" visible={this.state.displayModalEditar} style={{ width: '50vw' }} footer={this.renderFooter('displayModalEditar')} onHide={() => this.closeModal('displayModalEditar')}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Dialog>  

                {/* Modal Confirmar */}                
                <Dialog header="Confirmar" visible={this.state.displayModalConfirmar} modal style={{ width: '350px' }} footer={this.renderFooter('displayModalConfirmar')} onHide={() => this.onHide('displayModalConfirmar')}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            <span>Tem certeza que deseja continuar?</span>
                        </div>
                    </Dialog>
            </div>
        );
    }
}