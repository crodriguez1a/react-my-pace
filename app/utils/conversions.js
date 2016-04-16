
/**
  Convert units of measure to short name or abbreviation

  @method shortUnitName
  @private
  @param unit {string} Minutes or seconds
*/
export const shortUnitName = (unit) => {
  let map = {
    minutes: 'mins',
    seconds: 'secs'
  };
  return map[unit];
}
