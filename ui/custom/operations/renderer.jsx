import React from 'react';

class OperationRendered extends React.Component {

  constructor(props) {
    super(props);
  }


  render(){
    console.log(this.props.item)
    return <div>
    <div className="slds-tile__detail modal_detail">
        <dl className="slds-list_horizontal slds-wrap">
          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="First Label">Operation</dt>
          <dd className="slds-item_detail slds-truncate" title="Description for first label">{this.props.item.name}</dd>

          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="First Label">Service</dt>
          <dd className="slds-item_detail slds-truncate" title="Description for first label">{this.props.item.service}</dd>


          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="First Label">Function</dt>
          <dd className="slds-item_detail slds-truncate" title="Description for first label">{this.props.item.function}</dd>

        </dl>
      </div>
    </div>
  }
}

export default OperationRendered;



