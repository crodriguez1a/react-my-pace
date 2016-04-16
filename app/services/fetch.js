
class Fetch {
  constructor() {
    this.presetsUrl = 'assets/routines/presets.json';
  }

  /**
    Fetch specified preset routine

    @method fetchPreset
    @private
    @returns Promise
  */
  fetchPreset = (preset) => {
    return new Promise((resolve, reject) => {
      fetch(this.presetsUrl)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log('parsed json', json)
        resolve(json);
      }).catch(function(ex) {
        console.log('parsing failed', ex)
        reject(ex);
      });
    });
  }
}

// Export service as singleton
export default new Fetch();
