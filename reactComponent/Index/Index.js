import React, { Component} from 'react'
import ReactDOM from 'react-dom';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/IconButton/IconButton';
import CommunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import {Card, CardHeader, CardText} from 'material-ui/Card';



import Inputbar from '../Search/Inputbar'

injectTapEventPlugin();
/* Action */

/* Style */
import styles from './Index.scss'

class Index extends Component {

  componentWillMount() {

  }

  componentDidMount() {
    var resize = (function() {
      var mobileMode = $(window).width() < this.state.mobileModeWidth ? true : false;
      this.setState({mobileMode : mobileMode});

    }).bind(this);
    resize();

    var oldResize = window.onresize;
    window.onresize = function () {
        resize();
        if (typeof oldResize === 'function') {
            oldResize();
        }
    };

    $(window).on("orientationchange", function() {
      window.onresize();
    });

  }


  constructor(props) {
    super(props);
    var patternList = [];
    var baseformList = [];
    var explanationList = [];

    for (var i = 0; i < window.grammar.length; i++) {
      patternList.push(new RegExp(window.grammar[i].pattern));
      baseformList.push(window.grammar[i].base_form);
      explanationList.push(window.grammar[i].explanation);
    }

    this.state = { mobileMode : false,
      navigationBarHeight : 56, mobileModeWidth : 770,
      patternList : patternList, baseformList : baseformList,
      explanationList : explanationList, id2matchNumber : []};
  }

  componentDidUpdate() {
    var self = this;
    if (this.state.mobileMode && this.state.editJourneyId) {
        $(this.refs.searchResult).height($(window).height());
    } else {
        $(this.refs.searchResult).height($(window).height() - 118);
    }
  }



  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }



  render() {
    var geoSuggestWidth = 0;
    if (this.state.mobileMode) {
      geoSuggestWidth = $(window).width();
    } else {
      geoSuggestWidth = $(window).width() - 240;
    }

    return (
      <div style={{width : '100%', height: '100%', overflow: 'hidden'}}>
        <div style={{textAlign : 'center'}}>
          <div style={{margin : '0 auto', position : 'relative', width : 300, height : 64}}>
            <a href='/' style={{height : 64, display : 'inline-block'}}><img style={{width : 64, height : 64}} src='./jagr.png' /></a>
            <div style={{position : 'absolute', top : 19, right : 9}}>
              <a style={{textDecoration : 'none'}} href='mailto:nkflyfly@gmail.com'>
              <span style={{position : 'relative', left : '5px', fontSize : '15px', color : 'rgba(0, 0, 0, 0.87)'}}>JAGR</span>
              <IconButton style={{verticalAlign : 'sub'}} iconStyle={{width : 16, height : 16}}>
                <CommunicationMailOutline color='rgba(0, 0, 0, 0.87)'/>
              </IconButton>
              </a>
            </div>
          </div>
          <div style={{margin : '0 auto'}}>
            <div ref='geosuggestContainer' style={{width : geoSuggestWidth, display : 'inline-block', verticalAlign : 'top'}}>
              <Inputbar suggestListStyle={{marginTop : -2}} ref='geosuggest'
              onChange={(value) => {
                var id2matchNumber = [];
                for (var i = 0; i < this.state.patternList.length; i++) {
                  if (this.state.patternList[i].test(value)) {
                    id2matchNumber.push([i, this.state.baseformList[i].length]);
                  }
                }

                id2matchNumber.sort(
                    function(a, b) {
                        return a[1] - b[1]
                    }
                );

                this.setState({id2matchNumber});
              }}
              />
            </div>
          </div>
        </div>
        <div ref='searchResult' style={{width : '100%', backgroundColor: '#ffffff', overflow: 'hidden'}}>
          <div style={{padding : 0, height : '100%', fontSize : '16px'}}>
              <div ref='listArea' style={{margin : '0 auto', width : geoSuggestWidth, height : 'inherit', overflowY : 'scroll', overflowX : 'hidden'}}>
              {this.state.id2matchNumber.map((idAndMatchNumber, i) => {
                  return (
                    <Card key={'matchGrammar' + i}>
                      <CardHeader
                        title={this.state.baseformList[idAndMatchNumber[0]]}
                      />
                      <CardText>
                        {this.state.explanationList[idAndMatchNumber[0]]}
                      </CardText>
                    </Card>
                )
              })}
              </div>
          </div>
        </div>
      </div>
    );
  }
}

Index.childContextTypes = {
   muiTheme: React.PropTypes.object.isRequired,
};

module.exports = Index;
