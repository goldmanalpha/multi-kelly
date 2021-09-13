var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function replaceItem(items, index, scenario) {
    var _a = [
        __spreadArray([], items.slice(0, index), true),
        __spreadArray([], items.slice(index + 1), true),
    ], start = _a[0], end = _a[1];
    var newItems = scenario
        ? __spreadArray(__spreadArray(__spreadArray([], start, true), [scenario], false), end, true) : __spreadArray(__spreadArray([], start, true), end, true);
    return newItems;
}
