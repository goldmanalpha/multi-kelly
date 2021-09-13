var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputLabel, Input, InputAdornment, FormControl, } from '@material-ui/core';
import { useState } from 'react';
var counter = 0;
// other types like dollars are possible with some minor coding
// so not default
export var InputPercent = function (_a) {
    var title = _a.title, label = _a.label, labelProps = _a.labelProps, inputProps = _a.inputProps;
    var _b = useState(++counter), count = _b[0], _ = _b[1];
    var id = "mui-pct-" + count;
    return (_jsx(FormControl, { children: _jsxs("span", __assign({ title: title }, { children: [_jsx(InputLabel, __assign({ htmlFor: id }, labelProps, { children: label }), void 0), _jsx(Input, __assign({ id: id, type: "number" }, inputProps, { 
                    // value={numOrBlank(probabilityPct)}
                    // error={probabilityPctError}
                    // onChange={handleChange}
                    endAdornment: _jsx(InputAdornment, __assign({ position: "end" }, { children: "%" }), void 0) }), void 0)] }), void 0) }, void 0));
};
