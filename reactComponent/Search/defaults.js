/**
 * Default values
 */
export default {
  fixtures: [],
  initialValue: '',
  placeholder: '請輸入日文句子',
  disabled: false,
  className: '',
  inputClassName: '',
  location: null,
  radius: null,
  bounds: null,
  country: null,
  types: null,
  onSuggestSelect: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  skipSuggest: () => {},
  getSuggestLabel: suggest => suggest.description,
  autoActivateFirstSuggest: false
};
