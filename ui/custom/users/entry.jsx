import React from 'react';
import Toast from "../../../ion/components/toast";
import ButtonBar from "../../../ion/components/buttonBar";
import DataLookup from "../../../ion/components/dataLookup";
import Style from "./create.css";

class Entry extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      columns:[],
      title: "...",
      model: {},
      "rows":[]
    };
  }

  onSelectAccount(key,value){
    this.props.onUpdate(this.props.row, key, value);
  }

  onSelectType(key,value){
    this.props.onUpdate(this.props.row, key, value );
  }

  updateMonto(e){
   this.props.onUpdate(this.props.row, "monto", e.currentTarget.value);;
  }

  onClick(){
    this.props.onRemoveRow(this.props.row);
  }

  render(){
    var _this = this;
    var row = this.props.row;

    return <tr className="slds-hint-parent">


      <th className="slds-cell-edit" scope="row" tabIndex="0">
        <DataLookup
            itemKey={"id"}
            route="registro/account/all"
            view="all"
            column={{route: "register/account" }}
            principalColumn="nombre"
            onSelectColumn="account_id"
            selectedItem={row.account_id}
            onSelect={_this.onSelectAccount.bind(_this)}
            viewHeight={200}
          />
      </th>
      <td className="slds-cell-edit" role="gridcell">
        <ButtonBar
              errors={null}
              datakey="type"
              value={row.type}
              onChange={_this.onSelectType.bind(_this)}
              options={["CREDITO","DEBITO"]} />
      </td>
      <td className="slds-cell-edit" role="gridcell">
        <input onChange={this.updateMonto.bind(this)} className="slds-input"  value={row.monto}/>
      </td>
      <td className="slds-cell-edit" role="gridcell">
        <button onClick={this.onClick.bind(this)} className="slds-button slds-button_destructive">x</button>
      </td>
    </tr>
  }

}

export default Entry;
