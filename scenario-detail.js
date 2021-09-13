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
import { FormControl, Input, InputAdornment, InputLabel, TextField, } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { AddCircleOutline } from '@material-ui/icons';
import _ from 'lodash';
import { InputPercent } from './mui/adorned-input';
var scenarioDataFields = [
    'name',
    'description',
    'probabilityPct',
    'expectedReturnPct',
];
export var numericScenarioDataFields = [
    'probabilityPct',
    'expectedReturnPct',
];
var ScenarioDetail = React.memo(function (_a) {
    var name = _a.name, description = _a.description, probabilityPct = _a.probabilityPct, expectedReturnPct = _a.expectedReturnPct, useCustomStyling = _a.useCustomStyling, showErrors = _a.showErrors, updateCallback = _a.updateCallback;
    var handleChange = function (event) {
        var _a;
        var fieldName = event.target
            .name;
        var value = event.target.value;
        if (scenarioDataFields.includes(fieldName)) {
            var convert = numericScenarioDataFields.includes(fieldName);
            updateCallback((_a = {
                    name: name,
                    description: description,
                    probabilityPct: probabilityPct,
                    expectedReturnPct: expectedReturnPct
                },
                _a[fieldName] = convert
                    ? parseFloat(value)
                    : value,
                _a), fieldName);
        }
        else {
            console.error("unexpected field name: " + fieldName);
        }
    };
    var expectedReturnPctError = showErrors && typeof expectedReturnPct !== 'number';
    var probabilityPctError = showErrors && typeof probabilityPct !== 'number';
    var numOrBlank = function (n) {
        return typeof n === 'number' ? _.round(n, 1) : '';
    };
    return (_jsxs("div", __assign({ className: classNames('scenario', {
            'lib-styling': !useCustomStyling,
        }) }, { children: [_jsx(InputPercent, { title: "likelihood of occurence from 0 - 100", label: "Prob Pct*", labelProps: { error: probabilityPctError }, inputProps: {
                    name: 'probabilityPct',
                    className: 'percent-input',
                    required: true,
                    value: numOrBlank(probabilityPct),
                    error: probabilityPctError,
                    onChange: handleChange,
                } }, void 0), _jsx(FormControl, { children: _jsxs("span", __assign({ title: "Expected Payoff Pct: gain/loss expected for this scenario\n100 = doubling/getting back amount bet twice.\n0 = no gain/loss -- just return of amount bet\n-100 = losing amount bet." }, { children: [_jsx(InputLabel, __assign({ error: expectedReturnPctError }, { children: "Exp Gain*" }), void 0), _jsx(Input, { name: "expectedReturnPct", className: "percent-input", required: true, type: "number", value: numOrBlank(expectedReturnPct), error: expectedReturnPctError, onChange: handleChange, endAdornment: _jsx(InputAdornment, __assign({ position: "end" }, { children: "%" }), void 0) }, void 0)] }), void 0) }, void 0), _jsx(TextField, { label: "Name", className: "name", name: "name", required: true, value: name || '', error: showErrors &&
                    (typeof name !== 'string' || !name.trim()), onChange: handleChange }, void 0), _jsx(TextField, { label: "Description", className: "description", name: "description", value: description || '', onChange: handleChange }, void 0), _jsx("span", __assign({ title: "delete scenario", className: "delete-scenario" }, { children: _jsx(AddCircleOutline, { onClick: function () { return updateCallback(null, null); } }, void 0) }), void 0)] }), void 0));
});
export default ScenarioDetail;
