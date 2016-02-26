'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this.state = {
      trains: []
    };
    return _this;
  }

  _createClass(App, [{
    key: 'joinTrain',
    value: function joinTrain(e, train) {
      e.stopPropagation();
      console.log('join train, id = ', train.id);
      $.ajax({
        url: '/trains',
        type: 'POST',
        data: { 'id': train.id },
        success: function success(data) {
          console.log('POST successful');
        }
      });
    }
  }, {
    key: 'handleAccordionMap',
    value: function handleAccordionMap(id) {
      console.log(this.refs['dropdown' + id]);
      var clickedTrain = this.refs['dropdown' + id];
      if (clickedTrain.state.open) {
        clickedTrain.setState({
          open: false,
          accordionClass: "details"
        });
      } else {
        clickedTrain.setState({
          open: true,
          accordionClass: "details open"
        });
      }
    }
  }, {
    key: 'getTeamTrains',
    value: function getTeamTrains() {
      var _this2 = this;

      getCurrentTrains(function (trains) {
        _this2.setState({
          trains: trains
        });
      });
    }
  }, {
    key: 'renderMap',
    value: function renderMap(lat, lon, id) {
      console.log(lat, lon);
      return new google.maps.Map(document.getElementById('map' + id), {
        center: { lat: +lat, lng: +lon },
        zoom: 15
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getTeamTrains();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'trainsView container-fluid' },
          React.createElement(TrainsList, { trains: this.state.trains, handleAccordionMap: this.handleAccordionMap, joinTrain: this.joinTrain.bind(this), renderMap: this.renderMap.bind(this) })
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));