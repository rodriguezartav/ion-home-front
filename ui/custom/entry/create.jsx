import React from 'react';
import Toast from "../../../ion/components/toast";
import ButtonBar from "../../../ion/components/buttonBar";
import DataLookup from "../../../ion/components/dataLookup";
import Style from "./create.css";
import Entry from "./entry";


class CreateCustomComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      columns:[],
      title: "...",
      model: {},
      "rows":[]
    };
  }

  componentWillMount(){
    var _this = this;
  }

  onHideModal(){
    this.setState({columns: [], saveRoute: null });
    this.props.onClose();
  }

  onSave(){
    var _this = this;
    this.state.rows.forEach(function(row){
      row.referencia = _this.refs.referencia.value,
      row.observacion = _this.refs.referencia.observacion
      delete row.id;
    })
    this.props.onBatchAction("registro/entry/batch", this.state.rows)
    .then(function(result){
      console.log(result);

      if(!result) return;
      _this.setState({columns: [],rows:[], saveRoute:null });
      return _this.props.onSave(result);
    })
  }

  renderError(){
    if(!this.state.modalError) return null;
    var errors = Toast.parseError(this.state.modalError);
    return <Toast onExpire={this.onModalErrorHide.bind(this)} notifications={errors} />
    return <div>{ this.state.modalError.replace("(ion-e)","") }</div>
  }

  onUpdateRow(updatedRow,key,value){
    this.state.rows.forEach(function(row){
      if(row.id == updatedRow.id) row[key] = value;
    })

    this.setState({rows: this.state.rows})
  }

  onRemoveRow(row){
    var count = 0;
    this.state.rows.forEach(function(row,index){
      if(row.id == updatedRow.id) count = index;
    })
    this.state.rows.splice(count,1);

    this.setState({rows: this.state.rows})
  }


  onAddRow(){
    var rows = this.state.rows;
    rows.push({id: "a" + parseInt(Math.random()*10000), account_id: null, type: "DEBITO", "monto":0})
    this.setState({rows: rows });
  }

  renderRows(){
    var _this = this;
    return this.state.rows.map(function(row){
      return <Entry onRemoveRow={_this.onRemoveRow.bind(_this)} key={row.id} onUpdate={_this.onUpdateRow.bind(_this)} row={row} />
    })
  }

  renderBody(){
    return <div className="slds-m-around_small">

    <div className="slds-grid slds-gutters slds-m-bottom_medium">

    <div className="slds-col slds-size_2-of-3">
      <div>Observacion</div>
      <textarea ref="observacion" className="slds-input"></textarea>
    </div>
    <div className="slds-col slds-size_1-of-3">
    <div>Referencia</div>
      <input ref="referencia" className="slds-input" />
    </div>

    </div>


    <div className="slds-m-bottom_medium">
      <div>Entradas Contables</div>
      <button className="slds-button slds-button_brand" onClick={this.onAddRow.bind(this)}>Crear Entrada</button>
    </div>

    <div className="slds-table_edit_container slds-is-relative">
  <table className="slds-table slds-table_bordered slds-table_resizable-cols slds-table_fixed-layout slds-no-cell-focus slds-table_edit" role="grid" >
    <thead>
      <tr className="slds-line-height_reset">


        <th aria-sort="none" className="slds-is-sortable slds-is-resizable slds-text-title_caps" aria-label="Name" scope="col" >
          <a className="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabIndex="-1">

            <span className="slds-truncate" title="Name">Cuenta</span>
            <div className="slds-icon_container">
              <svg className="slds-icon slds-icon_x-small slds-icon-text-default slds-is-sortable__icon" aria-hidden="true">
                <use  xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown" />
              </svg>
            </div>
          </a>

          <div className="slds-resizable">
            <input type="range" min="20" max="1000" aria-label="Name column width" className="slds-resizable__input slds-assistive-text" id="cell-resize-handle-85" tabIndex="-1" />
            <span className="slds-resizable__handle">
              <span className="slds-resizable__divider"></span>
            </span>
          </div>
        </th>
        <th aria-sort="none" className="slds-is-sortable slds-is-resizable slds-text-title_caps" aria-label="Account Name" scope="col" >
          <a className="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabIndex="-1">

            <span className="slds-truncate" title="Account Name">Tipo</span>
            <div className="slds-icon_container">
              <svg className="slds-icon slds-icon_x-small slds-icon-text-default slds-is-sortable__icon" aria-hidden="true">
                <use  xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown" />
              </svg>
            </div>
          </a>

        </th>

        <th aria-sort="none" className="slds-is-sortable slds-is-resizable slds-text-title_caps" aria-label="Account Name" scope="col" >
          <a className="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabIndex="-1">

            <span className="slds-truncate" title="Account Name">Monto</span>
            <div className="slds-icon_container">
              <svg className="slds-icon slds-icon_x-small slds-icon-text-default slds-is-sortable__icon" aria-hidden="true">
                <use  xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown" />
              </svg>
            </div>
          </a>

        </th>

        <th scope="col" >
          <div className="slds-th__action slds-th__action_form">

          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {this.renderRows()}
    </tbody>
  </table>
</div>
</div>
  }

  render(){
    var height = this.props.viewHeight * 0.75;
    var columnViews = this.state.columns.map(function(column){ return column.name; })
    return <div className="entry-create">
    <div className="slds-page-header slds-m-bottom_small"  >
          <div className="slds-grid">
            <div className="slds-col slds-has-flexi-truncate">
              <div className="slds-media slds-no-space slds-grow">
                <div className="slds-media__figure">
                  <span className="slds-icon_container slds-icon-standard-user" >
                    <svg className="slds-icon" aria-hidden="true">
                      <use  xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#user"></use>
                    </svg>
                  </span>
                </div>
                <div className="slds-media__body">
                  <p className="slds-text-title_caps slds-line-height_reset">Titulo</p>
                  <h1 className="slds-page-header__title slds-m-right_small slds-align-middle slds-truncate" >{this.state.title}</h1>
                </div>
              </div>
            </div>
            <div className="slds-col slds-no-flex slds-grid slds-align-top">
              <div className="slds-button-group" role="group">
                <button onClick={this.onHideModal.bind(this)} className="slds-button slds-button_neutral">Cancelar</button>
                <button onClick={this.onSave.bind(this)}  key={"save"} className="slds-button slds-button_brand">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      {this.renderError()}
      {this.renderBody()}

    </div>

  }
}

export default CreateCustomComponent;
