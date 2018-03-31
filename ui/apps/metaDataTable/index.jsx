import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../ion/';

import { AppContainer } from 'react-hot-loader';
import Metadata from './metadata';
import Menu from "./metadata/menu.json";

const render = (Component) => {
  var App = Metadata(getParameterByName("app")||"proveedores");
  if(!App) return document.getElementById('root').innerHTML("App Not Found");

  ReactDOM.render(
    <AppContainer>
      <Component ionName="Rodco" menu={Menu} {...App} />
    </AppContainer>

   , document.getElementById('root')
  );
};



render(App);

if (module.hot){
  module.hot.accept('../../../ion', () => {
    render(App);
  })
}

window.requireLazy = function(path, callback){
  import(/* webpackChunkName: "custom" */ '../../custom/' + path ).then(Renderer => {
    callback(Renderer.default);
  }).catch(error => 'An error occurred while loading the component');
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
