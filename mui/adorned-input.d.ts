import { InputLabel, Input } from '@material-ui/core';
import { ComponentProps } from 'react';
interface Props {
    title?: string;
    label: string;
    labelProps: Partial<ComponentProps<typeof InputLabel>>;
    inputProps: Partial<ComponentProps<typeof Input>>;
}
export declare const InputPercent: ({ title, label, labelProps, inputProps, }: Props) => JSX.Element;
export {};
//# sourceMappingURL=adorned-input.d.ts.map