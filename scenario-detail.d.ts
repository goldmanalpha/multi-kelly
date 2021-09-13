import React from 'react';
export interface ScenarioData {
    name?: string;
    description?: string;
    probabilityPct?: number;
    expectedReturnPct?: number;
}
export declare const numericScenarioDataFields: readonly (keyof ScenarioData)[];
export interface Props extends ScenarioData {
    useCustomStyling?: boolean;
    showErrors: boolean;
    updateCallback: (p: ScenarioData | null, field: keyof ScenarioData | null) => void;
}
declare const ScenarioDetail: React.MemoExoticComponent<({ name, description, probabilityPct, expectedReturnPct, useCustomStyling, showErrors, updateCallback, }: Props) => JSX.Element>;
export default ScenarioDetail;
//# sourceMappingURL=scenario-detail.d.ts.map