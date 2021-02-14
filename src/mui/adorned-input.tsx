import {
  InputLabel,
  Input,
  InputAdornment,
  FormControl,
} from '@material-ui/core';
import React, { ComponentProps, useState } from 'react';

interface Props {
  title?: string;
  label: string;
  labelProps: Partial<ComponentProps<typeof InputLabel>>;
  inputProps: Partial<ComponentProps<typeof Input>>;
}

let counter = 0;

// other types like dollars are possible with some minor coding
// so not default
export const InputPercent = ({
  title,
  label,
  labelProps,
  inputProps,
}: Props) => {
  const [count, _] = useState(++counter);
  const id = `mui-pct-${count}`;

  return (
    <FormControl>
      <span title={title}>
        <InputLabel
          htmlFor={id}
          // error={probabilityPctError}
          {...labelProps}
        >
          {label}
        </InputLabel>
        <Input
          id={id}
          type="number"
          {...inputProps}
          // value={numOrBlank(probabilityPct)}
          // error={probabilityPctError}
          // onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              %
            </InputAdornment>
          }
        />
      </span>
    </FormControl>
  );
};
