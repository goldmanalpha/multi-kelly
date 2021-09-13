/// <reference types="react" />
import { ScenarioData } from './scenario-detail';
export interface ScenarioSummary {
    title: string;
    betPct?: number;
    expectedPayoff?: number;
    scenarioDetails: ScenarioData[];
}
interface Props {
    summaries: ScenarioSummary[];
    selectedCallback: (scenarioSummary: number) => void;
    selectedIndex: number;
}
declare const ScenarioChooser: ({ summaries, selectedCallback, selectedIndex, }: Props) => JSX.Element;
export default ScenarioChooser;
//# sourceMappingURL=scenario-chooser.d.ts.map