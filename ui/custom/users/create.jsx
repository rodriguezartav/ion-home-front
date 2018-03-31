import React from 'react';
import Toast from "../../../ion/components/toast";
import ButtonBar from "../../../ion/components/buttonBar";
import Toggle from "../../../ion/components/toggle";
import Ajax from "../../../ion/helpers/ajax";
import Style from "./create.css";
import Entry from "./entry";


class UpdateUserACL extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      columns:[],
      title: "...",
      model: {},
      "rows":[],
      operations:[],
      groups: {}
    };
  }

  componentWillMount(){
    var _this = this;
    return Ajax.get("/admin/operation/all")
    .then(function(results){
      _this.setState({operations: results});
    })

  }

  onHideModal(){
    this.setState({columns: [], saveRoute: null });
    this.props.onClose();
  }

  onToggleChange(name, checked){
    var contact = this.props.payload;
    if(!contact.acl) contact.acl = {};
    contact.acl[name] = checked;
    delete contact.payloadOptions;

    return Ajax.post("/admin/contact/create",contact)
    .then(function(results){
      console.log(results);
    })
    .catch(function(err){
      console.log(err);
    })
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

  displayGroup(e){
    var name = e.currentTarget.dataset.group;
    var group = this.state.groups
    if(group[name]) delete group[name];
    else group[name] = true;
    this.setState({groups: group})
  }

  renderFunctions(operationName,operations){
    var _this = this;
    var acl = _this.props.payload.acl || {};

    var groups = {};


    operations.forEach(function(fnc){
      if(!groups[fnc.name]) groups[fnc.name] = { name: fnc.name, functions: [] };
      groups[fnc.name].functions.push(fnc.function);
    })

    var groupArray = Object.keys(groups).map(function(key){
      return groups[key];
    })

    return  groupArray.map(function(group){

      var functions = group.functions.map(function(functionName){
        var path = operationName + "/"+ group.name + "/" + functionName;

        return <div>
          <Toggle key={path} isEnabled={acl[path]} name={path} onChange={_this.onToggleChange.bind(_this)} label={functionName}/>
          </div>
      })

      return <li key={group.name} role="treeitem" aria-level="2">
        <div className="slds-tree__item">
          <button className="slds-button slds-button_icon slds-m-right_x-small slds-is-disabled" >
            <svg className="slds-button__icon slds-button__icon_small" aria-hidden="true">
              <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#chevronright" />
            </svg>
          </button>
          <span className="slds-size_1-of-1">
            <span className="slds-tree__item-label slds-truncate" >{group.name}</span>
              { functions }

          </span>
        </div>
      </li>


    })
  }

  renderOperations(){
    var _this = this;
    return this.state.operations.map(function(operation){

      return <li key={operation.name} role="treeitem" >
        <div className="slds-tree__item">
          <button className="slds-button slds-button_icon slds-m-right_x-small slds-is-disabled">
            <svg className="slds-button__icon slds-button__icon_small">
              <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#chevronright" />
            </svg>

          </button>
          <span className="slds-size_1-of-1">
            <span onClick={_this.displayGroup.bind(_this)} data-group={operation.name} className="slds-tree__item-label slds-truncate" title="Tree Item">{operation.name}</span>
          </span>
        </div>
        <ul style={{display: _this.state.groups[operation.name]  ? "block" : "none"}} role="group">
          {_this.renderFunctions(operation.name,operation.operations)}
        </ul>
      </li>

    })
  }

  render(){
    var height = this.props.viewHeight * 0.75;
    return <div className="slds-tree_container slds-p-around_small" role="application">
      <a onClick={this.props.onClose } className="slds-button slds-button_neutral slds-m-bottom_small">
        Regresar
      </a>
      <h4 className="slds-text-title_caps" id="treeheading">{this.props.payload.first_name} {this.props.payload.last_name}</h4>
      <ul className="slds-tree" role="tree" aria-labelledby="treeheading">

      {this.renderOperations()}

      </ul>

    </div>

  }
}

export default UpdateUserACL;






