export default function (num) {
  const n = Number(num);
  var p = n.toFixed(2).split(".");
  return "$" + p[0].split("").reverse().reduce(function (acc, n, i, orig) {
    return n == "-" ? acc : n + (i && !(i % 3) ? "," : "") + acc;
  }, "") + "." + p[1];
};