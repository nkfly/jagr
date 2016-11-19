/* global window */

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import defaults from './defaults';
import filterInputAttributes from './filter-input-attributes';

import Input from './input';

import styles from './Inputbar.scss'

// Escapes special characters in user input for regex
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * Entry point for the Inputbar component
 */
class Inputbar extends React.Component {
  /**
   * The constructor. Sets the initial state.
   * @param  {Object} props The properties object.
   */
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      userInput: this.props.initialValue
    };
  }

  /**
   * Change inputValue if prop changes
   * @param {Object} props The new props
   */
  componentWillReceiveProps(props) {
    if (this.props.initialValue !== props.initialValue) {
      this.setState({userInput: props.initialValue});
    }
  }

  /**
   * Called on the client side after component is mounted.
   * Google api sdk object will be obtained and cached as a instance property.
   * Necessary objects of google api will also be determined and saved.
   */
  componentDidMount() {
    this.setState({userInput: this.props.initialValue});
    this.setState({isMounted: true});
  }

  /**
   * When the component will unmount
   */
  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  /**
   * When the input got changed
   * @param {String} userInput The input value of the user
   */
  onInputChange(userInput) {
    this.setState({userInput}, () => {
      this.props.onChange(userInput);
    });
  }

  /**
   * When the input gets focused
   */
  onInputFocus() {
    this.props.onFocus();
  }

  /**
   * When the input gets blurred
   */
  onInputBlur() {
    if (!this.state.ignoreBlur) {

    }
  }

  /**
   * Focus the input
   */
  focus() {
    this.refs.input.focus();
  }

  /**
   * Update the value of the user input
   * @param {String} userInput the new value of the user input
   */
  update(userInput) {
    this.setState({userInput});
    this.props.onChange(userInput);
  }

  /*
   * Clear the input
   */
  clear() {
    this.setState({userInput: ''});
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const attributes = filterInputAttributes(this.props),
      classes = classnames(
        'inputbar',
        this.props.className
      );


    return <div className={classes}>

      <Input className={this.props.inputClassName}
        ref='input'
        value={this.state.userInput}
        onChange={this.onInputChange.bind(this)}
        onFocus={this.onInputFocus.bind(this)}
        onBlur={this.onInputBlur.bind(this)}
        {...attributes} />


    </div>;
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
Inputbar.defaultProps = defaults;

export default Inputbar;
