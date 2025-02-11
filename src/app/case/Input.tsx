import React from 'react'
import { FormControl, FormControlLabel, RadioGroup, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setInputQuantity, setCustomInput } from './caseSlice'
import { useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import SolutionsBox from './SolutionsBox'
import QualityCompare from './QualityCompare'
import Radio from '@mui/material/Radio'
import InputPresets from './InputPresets'
import InputCustomValues from './InputCustomValues'

export default function Input() {
  const input = useAppSelector((state) => state.case.input)
  const endUse = useAppSelector((state) => state.case.endUse)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const handleSetCustomInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.value === 'true' ? true : false
    dispatch(setCustomInput(newState))
  }

  const [validQuantity, setValidQuantity] = React.useState(true)

  const handleChangeQuantity = (value: number) => {
    if (value >= 1 && value <= 20000 && Number.isInteger(Number(value))) {
      setValidQuantity(true)
      dispatch(setInputQuantity(value))
    } else {
      setValidQuantity(false)
      dispatch(setInputQuantity(value))
    }
  }

  return (
    <Grid container direction="row" alignItems="flex-start" spacing={3}>
      <Grid
        item
        container
        xs={endUse.qualityClass !== undefined ? 8 : 12}
        direction="row"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={4}>
          <Typography variant="h6">{t('Input')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel
                value="false"
                control={
                  <Radio
                    checked={input.custom === false}
                    onChange={handleSetCustomInput}
                    value={false}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                }
                label="Presets"
              />
              <FormControlLabel
                value="true"
                control={
                  <Radio
                    checked={input.custom === true}
                    onChange={handleSetCustomInput}
                    value={true}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'B' }}
                  />
                }
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {!input.custom ? <InputPresets /> : <InputCustomValues />}

        <Grid item xs={4}>
          <Typography style={{ marginBottom: 20 }}>{t('Average Quantity')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            error={!validQuantity}
            size="small"
            helperText={!validQuantity ? t('Expected between 1 and') + " 20'000" : ''}
            id="standard-number"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => handleChangeQuantity(Number(event.target.value))}
            value={input.quantity != null ? input.quantity : ''}
            InputProps={{
              endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>

        <QualityCompare />
      </Grid>
      {endUse.qualityClass || endUse.customValueEntered ? (
        <Grid item container xs={4}>
          <SolutionsBox />
        </Grid>
      ) : (
        <div />
      )}
    </Grid>
  )
}
