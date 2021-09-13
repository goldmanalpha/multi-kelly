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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import KellyEditor from './kelly-editor';
import { sampleScenarioSummaries } from './sample-data';
import ScenarioChooser from './scenario-chooser';
import { replaceItem } from './utility';
var App = function () {
    var _a = useState(sampleScenarioSummaries), summaries = _a[0], setSummaries = _a[1];
    var _b = useState(0), selectedSummaryIdx = _b[0], setSelectedSummaryIdx = _b[1];
    useEffect(function () {
        document.title = 'MultiKelly';
    }, []);
    var handleScenarioSelection = function (index) {
        setSelectedSummaryIdx(index);
    };
    var saveHandler = function (summary) {
        if (selectedSummaryIdx) {
            var fullSummary = __assign(__assign({}, summaries[selectedSummaryIdx]), { summary: summary });
            setSummaries(replaceItem(summaries, selectedSummaryIdx, fullSummary));
        }
        else {
            setSummaries(__spreadArray(__spreadArray([], summaries, true), [
                __assign({ title: new Date().toLocaleString() }, summary),
            ], false));
        }
    };
    var startScenario = summaries[selectedSummaryIdx].scenarioDetails;
    return (_jsxs("div", { children: [_jsx(ScenarioChooser, { summaries: summaries, selectedCallback: handleScenarioSelection, selectedIndex: selectedSummaryIdx }, void 0), _jsx(KellyEditor, { showHeader: true, startScenario: startScenario, saveCallback: saveHandler }, void 0)] }, void 0));
};
export default App;
