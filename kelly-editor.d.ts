/// <reference types="react" />
import { ScenarioData } from './scenario-detail';
import './kelly.scss';
import { ScenarioSummary } from './scenario-chooser';
interface Props {
    startScenario: ScenarioData[];
    showHeader?: boolean;
    useCustomStyling?: boolean;
    saveCallback?: (summary: Omit<ScenarioSummary, 'title'>) => void;
}
declare const KellyEditor: ({ startScenario, showHeader, useCustomStyling, saveCallback, }: Props) => JSX.Element;
export default KellyEditor;
//# sourceMappingURL=kelly-editor.d.ts.map