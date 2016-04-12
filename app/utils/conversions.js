
/**
  Convert units of measure to short name or abbreviation

  @method shortUnitName
  @private
*/
export const shortUnitName = (unit) => {
  let map = {
    minutes: 'mins',
    seconds: 'secs'
  };
  return map[unit];
}
