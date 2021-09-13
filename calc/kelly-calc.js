import _ from 'lodash';
/**
 * calcKellyBetSize: based on: https://math.stackexchange.com/a/662210
 * @param odds
 * @returns 0-100: kelly percent of capital to invest
 */
var calcKellyBetSize = function (odds) {
    var yCalc = function (x) {
        return _.sum(odds.map(function (o) {
            return o.probability *
                Math.log(1 + (o.payoffReturn * x) / 100);
        }));
    };
    var graph = _.range(0, 101).map(yCalc);
    function getMaxIdx(graph) {
        var max = Math.max.apply(Math, graph);
        var maxIdx = graph.indexOf(max);
        return maxIdx;
    }
    var maxIdx = getMaxIdx(graph);
    var maxIdx2 = getMaxIdx(graph.map(function (y, i) { return (i === maxIdx ? -Infinity : y); }));
    var direction = maxIdx2 > maxIdx ? 1 : -1;
    var graph2 = _.range(0, 9)
        .map(function (x) { return maxIdx + (direction * x) / 10; })
        .map(yCalc);
    var decimalMaxIdx = getMaxIdx(graph2);
    var y = graph2[decimalMaxIdx];
    return {
        betPct: maxIdx + (direction * decimalMaxIdx) / 10,
        graph: graph,
        expectedPayoff: Math.pow(Math.E, y),
    };
};
export default calcKellyBetSize;
