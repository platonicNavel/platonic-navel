import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import GoogleMap from './GoogleMap.js';
import GoogleList from './GoogleList.js';
import GoogleListDropdown from './GoogleListDropdown.js';

import createTrain from '../../../utils/createTrain.js';

class GoogleListEntry extends Component {
  constructor(props) {
      super(props)
    }

  createTrain(e, d, d2, place_id, name, lat, lng, visits) {
    e.stopPropagation();
    createTrain(d, d2, place_id, name, lat, lng, visits);
  }

    render() {
        let item = this.props.item;
        let placeId = item.place_id;
        let smallMaps = "https://www.google.com/maps/embed/v1/place?q=place_id:"+ placeId +"&key=AIzaSyAxXjy2uKnQcnU1SxfaSil-fY5ek_nmkE4"

        if(item.opening_hours.open_now) {
            item.opening_hours.open_now = 'open'
          } else {
            item.opening_hours.open_now = 'closed'
          }


        if(item.price_level === 1) {
          item.price_level = '$'
        } else if(item.price_level === 2) {
          item.price_level = '$$'
        } else if(item.price_level === 3) {
          item.price_level = '$$$'
        } else if(item.price_level === 4) {
          item.price_level = '$$$$'
        } else {
          item.price_level = '$$$$$'
        }

        let d = new Date().getTime();
        let d2 = d+3600;
        return (
          <div>
            <div>
              {item.name} 
            </div>
          </div>
        )
      return (
        <div>
          {listItems} 
        </div>
      )
    }
  }



export default GoogleListEntry;
