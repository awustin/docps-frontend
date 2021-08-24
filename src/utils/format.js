export function validateUsername(value) {
  const illegal = '[^A-Za-z0-9]';
  return (value.toString().search(illegal) < 0);
}

export function datePickerRangeConvert(inRange) {
	return (inRange !== undefined) ? inRange.map( d => new Date(d)) : []
}