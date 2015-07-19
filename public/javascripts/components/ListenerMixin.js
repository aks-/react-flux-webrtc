module.exports = {
  componentDidMount: function() {
    CallStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CallStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getLocalVideoStateFromStore());
  }
}


