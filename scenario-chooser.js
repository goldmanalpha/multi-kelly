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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, } from '@material-ui/core';
import { useState } from 'react';
var scenarioDetailsUi = function (data) {
    return (_jsx(TableContainer, __assign({ component: Paper }, { children: _jsxs(Table, __assign({ size: "small" }, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "name" }, void 0), _jsx(TableCell, __assign({ align: "right", title: "probability" }, { children: "Prob" }), void 0), _jsx(TableCell, __assign({ align: "right", title: "expected gain" }, { children: "Exp" }), void 0), _jsx(TableCell, { children: "description" }, void 0)] }, void 0) }, void 0), _jsx(TableBody, { children: data.map(function (d, i) { return (_jsxs(TableRow, { children: [_jsx(TableCell, { children: d.name }, void 0), _jsx(TableCell, __assign({ align: "right" }, { children: d.probabilityPct }), void 0), _jsx(TableCell, __assign({ align: "right" }, { children: d.expectedReturnPct }), void 0), _jsx(TableCell, { children: d.description }, void 0)] }, i)); }) }, void 0)] }), void 0) }), void 0));
};
var ScenarioChooser = function (_a) {
    var summaries = _a.summaries, selectedCallback = _a.selectedCallback, selectedIndex = _a.selectedIndex;
    var _b = useState(false), isSelecting = _b[0], setIsSelecting = _b[1];
    var handleClick = function (index) {
        setIsSelecting(false);
        selectedCallback(index);
    };
    var toggleSelecting = function () {
        setIsSelecting(function (s) { return !s; });
    };
    var SingleSummaryUi = function (_a) {
        var index = _a.index;
        var summary = summaries[index || 0];
        return (_jsxs(_Fragment, { children: [_jsx(Button, __assign({ variant: "contained", color: "primary", onClick: toggleSelecting, disabled: isSelecting }, { children: "Select a scenario" }), void 0), index !== null && !isSelecting && (_jsx(TableContainer, __assign({ component: Paper, className: "lib-styling scenario-chooser-list" }, { children: _jsxs(Table, __assign({ size: "small" }, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }, void 0), _jsx(TableCell, { children: "scenarios" }, void 0)] }, void 0) }, void 0), _jsx(TableBody, { children: _jsxs(TableRow, __assign({ onClick: function () { return handleClick(index); } }, { children: [_jsx(TableCell, __assign({ component: "th", scope: "row" }, { children: summary.title }), void 0), _jsx(TableCell, { children: scenarioDetailsUi(summary.scenarioDetails) }, void 0)] }), index) }, void 0)] }), void 0) }), void 0))] }, void 0));
    };
    return (_jsxs(_Fragment, { children: [_jsx(SingleSummaryUi, { index: selectedIndex }, void 0), isSelecting && (_jsx(TableContainer, __assign({ component: Paper, className: "lib-styling scenario-chooser-list" }, { children: _jsxs(Table, __assign({ size: "small" }, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }, void 0), _jsx(TableCell, { children: "scenarios" }, void 0)] }, void 0) }, void 0), _jsx(TableBody, __assign({ className: "outer-container" }, { children: summaries.map(function (sum, i) { return (_jsxs(TableRow, __assign({ onClick: function () { return handleClick(i); }, selected: (selectedIndex || 0) === i }, { children: [_jsx(TableCell, __assign({ component: "th", scope: "row" }, { children: sum.title }), void 0), _jsx(TableCell, { children: scenarioDetailsUi(sum.scenarioDetails) }, void 0)] }), i)); }) }), void 0)] }), void 0) }), void 0))] }, void 0));
};
export default ScenarioChooser;
