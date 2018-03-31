import React from 'react';
import style from "./logRenderer.css";

class ClienteRenderer extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMessage(message){
    var div = [];
    console.log(typeof message)

    if( typeof message === 'object' ){
      var keys = Object.keys(message);
      keys.forEach(function(key){
        div.push( <div><strong className="object-key">{key}</strong> <span className="object-message">{JSON.stringify( message[key] ) }</span> </div> );
      })
    }
    else div.push( <div>{message}</div>  );

    return div;
  }

  render(){
    console.log(this.props.item)
    return <div>
    <div className="slds-tile__detail modal_detail">
        <dl className="slds-list_horizontal slds-wrap">
          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="First Label">Tags</dt>
          <dd className="slds-item_detail slds-truncate" title="Description for first label">{this.props.item.tags.join(", ")}</dd>

          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="First Label">UserName</dt>
          <dd className="slds-item_detail slds-truncate" title="Description for first label">{this.props.item.user_name}</dd>


          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="First Label">UserName</dt>
          <dd className="slds-item_detail slds-truncate" title="Description for first label">{this.props.item.user_name}</dd>


          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="First Label">Path</dt>
          <dd className="slds-item_detail slds-truncate" title="Description for first label">{this.props.item.tags.join(", ")}</dd>

          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="First Label">Request Time</dt>
          <dd className="slds-item_detail slds-truncate" title="Description for first label">{this.props.item.requestTime }</dd>


          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="First Label">Message</dt>
          <dd className="slds-item_detail slds-truncate" title="Description for first label">{this.renderMessage(this.props.item.message)}</dd>


        </dl>
      </div>
    </div>
  }
}

export default ClienteRenderer;



