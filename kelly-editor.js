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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import ScenarioDetail, { numericScenarioDataFields, } from './scenario-detail';
import { AddCircleOutline } from '@material-ui/icons';
import './kelly.scss';
import classNames from 'classnames';
import { Button, Typography } from '@material-ui/core';
import calcKellyBetSize from './calc/kelly-calc';
import _ from 'lodash';
import { replaceItem } from './utility';
require('react-dom');
var w = window;
w.React2 = require('react');
console.log('React Compare', w.React1 === w.React2);
var getTotalProbabilityPct = function (scenarios) {
    return _.sum(scenarios.map(function (s) { return s.probabilityPct || 0; })) || 0;
};
var validateSum100Pct = function (scenarios) {
    return Math.abs(getTotalProbabilityPct(scenarios) - 100) < 0.01;
};
var validate = function (scenarios) {
    var allGood = scenarios.every(function (s) {
        return typeof s.probabilityPct === 'number' &&
            typeof s.expectedReturnPct === 'number' &&
            s.name;
    });
    return (allGood &&
        scenarios.length > 0 &&
        validateSum100Pct(scenarios));
};
var KellyEditor = function (_a) {
    var startScenario = _a.startScenario, showHeader = _a.showHeader, useCustomStyling = _a.useCustomStyling, saveCallback = _a.saveCallback;
    var _b = useState(startScenario), scenarios = _b[0], setScenarios = _b[1];
    var _c = useState(null), kellyResult = _c[0], setKellyResult = _c[1];
    var _d = useState(validate(startScenario)), canCalc = _d[0], setCanCalc = _d[1];
    var _e = useState(false), showErrors = _e[0], setShowErrors = _e[1];
    var _f = useState(0), startCount = _f[0], setStartCount = _f[1];
    useEffect(function () {
        setScenarios(startScenario);
        var canCalc = validate(startScenario);
        setCanCalc(canCalc);
        setStartCount(startCount + 1);
        setKellyResult(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startScenario]);
    useEffect(function () {
        if (canCalc) {
            tryCalculate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startCount, canCalc]);
    var addScenario = function () {
        setScenarios(__spreadArray(__spreadArray([], scenarios, true), [{}], false));
        setKellyResult(null);
    };
    var updateScenario = function (index, scenario, updateField) {
        var newScenarios = replaceItem(scenarios, index, scenario);
        setScenarios(newScenarios);
        setCanCalc(validate(newScenarios));
        if (numericScenarioDataFields.includes(updateField) ||
            scenario === null) {
            setKellyResult(null);
        }
    };
    var tryCalculate = function () {
        if (canCalc) {
            var newKellyResult = calcKellyBetSize(scenarios.map(function (s) { return ({
                probability: s.probabilityPct / 100,
                payoffReturn: s.expectedReturnPct / 100,
            }); }));
            setKellyResult(newKellyResult);
            setShowErrors(false);
        }
        else {
            setShowErrors(true);
        }
    };
    var handleSave = function () {
        saveCallback(__assign(__assign({}, kellyResult), { scenarioDetails: scenarios }));
    };
    var totalProbabilityPct = getTotalProbabilityPct(scenarios);
    return (_jsxs("div", __assign({ className: classNames('kelly-editor', {
            'lib-styling': !useCustomStyling,
        }) }, { children: [showHeader && (_jsx("h1", { children: "Multi Kelly Criterion Calculator" }, void 0)), _jsxs("div", __assign({ className: "scenarioManager" }, { children: [_jsx("span", __assign({ title: "add scenario", className: "add-scenario" }, { children: _jsx(AddCircleOutline, { onClick: addScenario }, void 0) }), void 0), _jsx(Button, __assign({ variant: "outlined", onClick: tryCalculate, color: canCalc ? 'primary' : 'secondary', title: canCalc
                            ? 'ready'
                            : "fix scenarios. " + (showErrors ? '' : ' click to see errors') }, { children: "Calculate" }), void 0), !validateSum100Pct(scenarios) && (_jsxs(Typography, __assign({ color: "secondary" }, { children: ["Total probability should be 100% but is", _.round(totalProbabilityPct, 2), "%.", ' ', _jsx("div", { children: "Can't calculate. Please update the probabilities." }, void 0)] }), void 0)), kellyResult && (_jsxs("div", __assign({ className: "results" }, { children: [saveCallback && (_jsx(Button, __assign({ onClick: handleSave, variant: "outlined", color: "primary" }, { children: "Save" }), void 0)), _jsxs("div", { children: [_jsxs(Typography, { children: ["kelly bet size: ", kellyResult.betPct, "%"] }, void 0), _jsxs(Typography, { children: ["expected return:", ' ', _.round(100 * (kellyResult.expectedPayoff - 1), 1), "%"] }, void 0)] }, void 0)] }), void 0))] }), void 0), _jsx("ol", __assign({ className: "scenarios-container" }, { children: scenarios.map(function (s, i) { return (_jsx("li", { children: _jsx(ScenarioDetail, __assign({}, s, { showErrors: showErrors, updateCallback: updateScenario.bind(_this, i) }), void 0) }, i)); }) }), void 0)] }), void 0));
};
export default KellyEditor;
