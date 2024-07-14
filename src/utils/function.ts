export function textSlicer(txt: string, max: number = 70) {
  if (txt.length > max) {
    return txt.slice(0, max) + " ...";
  } else {
    return txt;
  }
}
