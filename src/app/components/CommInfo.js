import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { communityInfoData } from '../data/formValues'
import { setCountry, setCurrency } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'

export default function CommInfo() {
  const commInfo = useSelector(state => state.case.commInfo)
  const dispatch = useDispatch()
  const countries = []
  communityInfoData.map(country => {
    return countries.push(country.name)
  })

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Community Information</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography>Select the Country</Typography>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          id="combo-box-demo"
          options={communityInfoData}
          getOptionLabel={option => option.name}
          onChange={(event, newValue) => dispatch(setCountry(newValue.id))}
          disableClearable
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about countries">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <Typography>Select the Currency</Typography>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          id="combo-box-demo"
          options={[communityInfoData[commInfo.countryID], { id: 1000, currency: 'USD' }]}
          getOptionLabel={option => option.currency}
          onChange={(event, newValue) => dispatch(setCurrency(newValue.id))}
          disableClearable
          disabled={commInfo.countryID === null ? true : false}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about currencies">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
    </Grid>
  )
}
